import { chromium } from 'playwright';

async function createPdfBuffer(html: any) {
  const browser = await chromium.launch(); 
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close(); 
  return pdfBuffer;
}

export { createPdfBuffer };
