// scripts/scrapeTestpoints.js
import puppeteer from 'puppeteer';
import { createClient } from '@sanity/client';

// 1. CONFIGURE SANITY CLIENT
const sanityClient = createClient({
  projectId: 'k06np8tt', // Paste Project ID
  dataset: 'production',
  token: 'sk55rPoTWhSdh7Udg9pYwaN2Te0sqhXWsNx20u7vXaDMHk5KvrZj0XEallSg7y0oIzKiojKWGZtSe0vzGSfZtfSvHJMVCp2Zxack8lFl1ck5zlDGBpeInxPp0bgK8Qe7RXM6uGcSDrfB2lfdFsnlBgDjvcKRlwGdipdNOdvGZkdgVNB0aJp6',   // Paste Write Token
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function scrapeAndImport() {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  console.log('📡 Navigating to Chimera Test Points...');
  await page.goto('https://chimeratool.com/en/test-points', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });

  await page.waitForSelector('a[href*="/test-points/"]', { timeout: 15000 }).catch(() => {
    console.log('Warning: Timeout waiting for grid selector, attempting scrape anyway...');
  });

  console.log('🔍 Scraping test point cards...');

  const testpoints = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('a[href*="/test-points/"]'));
    
    return cards.map(card => {
      const titleEl = card.querySelector('h2, h3, div, span');
      const title = titleEl ? titleEl.innerText.trim() : '';

      const codeEl = card.querySelector('p, small, .model-code');
      const modelCode = codeEl ? codeEl.innerText.trim() : '';

      const img = card.querySelector('img');
      const imgUrl = img ? (img.src || img.getAttribute('data-src')) : '';

      return { title, modelCode, imgUrl };
    }).filter(item => item.title.length > 0 && item.imgUrl);
  });

  console.log(`✅ Found ${testpoints.length} testpoints on page.`);

  if (testpoints.length === 0) {
    console.log('⚠️ No items extracted. Check if site structure changed.');
    await browser.close();
    return;
  }

  for (const tp of testpoints) {
    try {
      console.log(`📤 Uploading to Sanity: ${tp.title} (${tp.modelCode})`);

      const titleLower = tp.title.toLowerCase();
      let detectedBrand = 'Other';
      if (titleLower.includes('samsung')) detectedBrand = 'Samsung';
      else if (titleLower.includes('xiaomi') || titleLower.includes('redmi')) detectedBrand = 'Xiaomi';
      else if (titleLower.includes('tecno')) detectedBrand = 'Tecno';
      else if (titleLower.includes('infinix')) detectedBrand = 'Infinix';
      else if (titleLower.includes('vivo')) detectedBrand = 'Vivo';
      else if (titleLower.includes('oppo') || titleLower.includes('realme')) detectedBrand = 'Oppo';
      else if (titleLower.includes('nokia') || titleLower.includes('hmd')) detectedBrand = 'Nokia';
      else if (titleLower.includes('honor')) detectedBrand = 'Honor';

      await sanityClient.create({
        _type: 'product',
        title: `${tp.title} ${tp.modelCode ? `(${tp.modelCode})` : ''} Testpoint Diagram`,
        category: 'testpoints',
        subcategory: 'qualcomm',
        brand: detectedBrand,
        itemCondition: 'brand_new',
        price: 0,
      });

      console.log(`  └─ Done!`);
    } catch (err) {
      console.error(`  └─ Failed to upload ${tp.title}:`, err.message);
    }
  }

  await browser.close();
  console.log('🎉 All testpoints uploaded successfully!');
}

scrapeAndImport();