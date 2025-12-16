import { log } from "../lib/logger.js";

import { BASEURL, HOME_BUTTON, HOME_FIRST_INPUT, HOME_SECOND_INPUT, SIGN_OUT_BUTTON } from '../lib/consts.js';

export async function login(page, username, refNumber) {
  try {
    // Navigate the page to a URL.
    await page.goto(BASEURL);

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    await page.type(HOME_FIRST_INPUT, username);
    // await page.locator(HOME_FIRST_INPUT).fill(username);
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.locator(HOME_SECOND_INPUT).fill(refNumber);
    await new Promise(resolve => setTimeout(resolve, 100));

    await page.locator(HOME_BUTTON).click();
    // await page.waitForTimeout(1000);//??
    await page.waitForNavigation({ waitUntil: 'networkidle2' })

    const exists = await page.$eval(SIGN_OUT_BUTTON, (el) => el.innerText == "Sign out").catch(() => false)
    return exists
  } catch (error) {
    if (error.message.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('ERR_NAME_NOT_RESOLVED');
    } else if (error.message.includes('ERR_CONNECTION_CLOSED')) {
      throw new Error('ERR_CONNECTION_CLOSED');
    } else {
      log('unexpected error:', error);
    }
  }
  return false
}