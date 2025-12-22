import proxyChain from 'proxy-chain';
import puppeteer from 'puppeteer';
import { BASEURL } from './lib/consts.js';

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9998 --user-data-dir="C:\Users\Admin\Desktop\said"
// http://localhost:9998/json/version
const wsurl = 'ws://127.0.0.1:9998/devtools/browser/233bb613-db8d-4d08-ace0-1c81023b54cd'

const username = 'FRASE054274TL9KN';
const refNumber = '67367125';

(async () => {
  const oldProxyUrl = 'http://251218u38dO-mobile-UK:WXHmiXAJXTaS67L@eu.proxy-jet.io:1010 ';
  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--proxy-server=${newProxyUrl}`
    ]
  });

  const page = await browser.newPage();
  await page.goto(BASEURL);
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();

