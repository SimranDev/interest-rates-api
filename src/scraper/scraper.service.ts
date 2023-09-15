import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  constructor(private prisma: PrismaService) {}

  // @Cron(CronExpression.EVERY_12_HOURS)
  @Cron('0 * * * *')
  async handleCron() {
    this.logger.debug('Cron job started');
    try {
      await this.scrapeAndUpsertData();
    } catch (error) {
      this.logger.error('Failed to scrape and upsert data', error.stack);
    }
  }

  async scrapeAndUpsertData() {
    let browser;

    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(process.env.SCRAPE_URL);

      const data = await page.evaluate(() => {
        function extractBankName(url: string) {
          const parts = url.split('/');
          const logoFilename = parts[parts.length - 1];
          return logoFilename.split('.')[0];
        }

        const rows = document.querySelectorAll('#tablepress-all tbody tr');
        return Array.from(rows, (row) => {
          const columns = row.querySelectorAll('td');
          return Array.from(columns, (column, index) => {
            if (index === 0) {
              const img = column.querySelector('img');
              return img ? extractBankName(img.src) : null;
            }
            return column.innerText;
          });
        });
      });

      this.logger.log('Scraped data', data);

      for (const row of data) {
        const lenderName = row[0];
        const identifier = lenderName
          .replace(/[^a-zA-Z0-9]/g, '')
          .toLowerCase();

        const lender = await this.prisma.lender.upsert({
          where: { identifier },
          update: { name: lenderName, updatedAt: new Date() },
          create: { identifier, name: lenderName },
        });

        await this.prisma.loanProduct.upsert({
          where: {
            name_lenderId: {
              name: 'Standard',
              lenderId: lender.id,
            },
          },
          update: {
            floating: parseFloat(row[1]) || null,
            fixed12Months: parseFloat(row[2]) || null,
            fixed24Months: parseFloat(row[3]) || null,
            fixed36Months: parseFloat(row[4]) || null,
            fixed48Months: parseFloat(row[5]) || null,
            fixed60Months: parseFloat(row[6]) || null,
            updatedAt: new Date(),
          },
          create: {
            name: 'Standard',
            lenderId: lender.id,
            floating: parseFloat(row[1]) || null,
            fixed12Months: parseFloat(row[2]) || null,
            fixed24Months: parseFloat(row[3]) || null,
            fixed36Months: parseFloat(row[4]) || null,
            fixed48Months: parseFloat(row[5]) || null,
            fixed60Months: parseFloat(row[6]) || null,
          },
        });
      }
    } catch (error) {
      this.logger.error('Scraping or upserting failed', error.stack);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
