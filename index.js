import puppeteer from 'puppeteer';
import { BASEURL } from './lib/consts.js';
import { log } from './lib/logger.js';
import { checkChange } from './pages/check-change.js';
import { login } from './pages/login.js';
import { proxies } from './proxies.js';

(async () => {
  for (let i = 0; i < proxies.length; i++) {
    const proxy = proxies[i];
    log('trying proxy', proxy);
    const args = [];
    if (proxy) {
      args.push('--proxy-server=' + proxy);
    }
    // Launch the browser and open a new blank page.
    const browser = await puppeteer.launch({ headless: false, args });

    try {
      await run(browser, proxy);
    } catch (error) {
      if (error.message.includes('ERR_NAME_NOT_RESOLVED')) {
        log('ERR_NAME_NOT_RESOLVED');
      } else if (error.message.includes('ERR_CONNECTION_CLOSED')) {
        log('ERR_CONNECTION_CLOSED');
      } else if (error.message.includes('ERR_TUNNEL_CONNECTION_FAILED')) {
        log('ERR_TUNNEL_CONNECTION_FAILED');
      } else {
        log('unexpected error:', error);
      }
    }
    finally {
      await browser.close();
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

})()
// run().catch(error => console.log('error2', error));



// SAIDA657054SM9IJ
// EMRE657054MORGA
// ADNAN57M9IJ054S

const username = 'ADNAN57M9IJ054S';
const refNumber = '1234567890';


export async function run(browser, proxy) {

  if (!BASEURL) {
    throw new Error('BASEURL is not defined');
  }
  const args = [];
  if (proxy) {
    args.push('--proxy-server=' + proxy);
  }
  if (!browser) {
    browser = await puppeteer.launch({ headless: false, args });
  }
  // Launch the browser and open a new blank page.
  const page = await browser.newPage();

  await page.goto(BASEURL);
  console.log('successfull using proxy', proxy);
  return

  if (!await login(page, username, refNumber)) {
    log('Login failed');
    await browser.close();
    return;
  }
  else {
    log('Login success');
  }
  if (await checkChange(page)) {
    log('There is change test centre');
  }
  else {
    log('There is NO change test centre');
  }

  // await browser.close();
}
