import puppeteer from 'puppeteer';
import { BASEURL } from './lib/consts.js';
import { log } from './lib/logger.js';
import { checkChange } from './pages/check-change.js';
import { login } from './pages/login.js';
import { proxies } from './proxies.js';

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9998 --user-data-dir="C:\Users\Admin\Desktop\said"
// http://localhost:9998/json/version
const wsurl = 'ws://127.0.0.1:9998/devtools/browser/233bb613-db8d-4d08-ace0-1c81023b54cd'

const username = 'FRASE054274TL9KN';
const refNumber = '67367125';

runWithoutProxy()

async function runWithoutProxy() {
  // Launch the browser and open a new blank page.
  const browser = await //puppeteer.launch({ headless: false });
    puppeteer.connect({ browserWSEndpoint: wsurl })
  try {
    await run(browser);
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
    // await browser.close();
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function run(browser, proxy) {

  if (!BASEURL) {
    throw new Error('BASEURL is not defined');
  }
  if (!browser) {
    throw new Error('browser is not defined');
  }
  const args = [];
  if (proxy) {
    args.push('--proxy-server=' + proxy);
  }
  // Launch the browser and open a new blank page.
  const page = await browser.newPage();

  await page.goto(BASEURL);

  console.log('successfull using proxy', proxy);

  if (!await login(page, username, refNumber)) {
    log('Login failed');
    // await browser.close();
    return;
  }
  else {
    log('Login success');
  }
  return

  if (await checkChange(page)) {
    log('There is change test centre');
  }
  else {
    log('There is NO change test centre');
  }

  // await browser.close();
}



async function runWithProxy() {
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
}

