import puppeteer from 'puppeteer';
import { BASEURL } from './lib/consts.js';
import { log } from './lib/logger.js';
import { checkChange } from './pages/check-change.js';
import { login } from './pages/login.js';
const username = 'FRASE054274TL9KN';
const refNumber = '67367125';

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9998 --user-data-dir="C:\Users\Admin\Desktop\said"
// http://localhost:9998/json/version
const browserWSEndpoint = 'ws://127.0.0.1:9998/devtools/browser/233bb613-db8d-4d08-ace0-1c81023b54cd'

run()

async function run() {

  if (!BASEURL) {
    throw new Error('BASEURL is not defined');
  }
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.connect({ browserWSEndpoint });
  // Launch the browser and open a new blank page.
  const page = await browser.newPage();

  try {

    if (!await login(page, username, refNumber)) {
      log('Login failed');
      // await browser.close();
      return;
    }
    else {
      log('Login success');
    }
  } catch (error) {
    log('Login failed with error', error);
  }

  return


  try {
    if (await checkChange(page)) {
      log('There is change test centre');
    }
    else {
      log('There is NO change test centre');
    }

  } catch (error) {

  }
  await browser.close();
}
