import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  @Cron(CronExpression.EVERY_6_HOURS)
  async getLenderRates() {
    let browser;
    try {
      browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      await page.goto(process.env.SCRAPE_URL);

      const data = await page.evaluate(() => {
        const rows = Array.from(
          document.querySelectorAll('#tablepress-all tbody tr'),
        );
        console.log('rows', rows);

        const headers = Array.from(
          document.querySelectorAll('#tablepress-all thead th'),
        ).map((header) => header.textContent.trim());

        console.log('headers', headers);

        return rows.map((row) => {
          const cells = Array.from(row.querySelectorAll('td'));
          const rowData = {};
          cells.forEach((cell, index) => {
            const img = cell.querySelector('img');
            if (img && index === 0) {
              rowData[headers[index]] = img.src.split('/').pop().split('.')[0]; // Get bank name from the img src
            } else {
              rowData[headers[index]] = cell.textContent.trim();
            }
          });
          return rowData;
        });
      });

      console.log('data', data);
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      return [];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
