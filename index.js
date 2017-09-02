let puppeteer = require('puppeteer');

(async () => {
  async function getValues(selector) {
    let value = await page.evaluate((sel) => {
      let elements = document.querySelectorAll(sel)

      console.log(typeof elements);
      return elements.map(e => e.innerHTML, elements)
    }, selector)
    return value
  }


  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://pcf.fit/schedule');

  await page.mainFrame().waitFor('.eo_start_at');  
  
  const startTimes = await page.evaluate(() => {
    const startTimesEl = Array.from(document.querySelectorAll('.eo_start_at'));
    return startTimesEl.map(anchor => anchor.textContent);
  });
  
  console.log(startTimes.join('\n'));

  await page.screenshot({path: 'example.png'});

  browser.close();
})();

