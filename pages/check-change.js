// test-centre-change


import { CHANGE_TEST_CENTRE_BUTTON } from '../lib/consts.js';
import { log } from "../lib/logger.js";


export async function checkChange(page) {
  try {
    const exists = await page.$eval(CHANGE_TEST_CENTRE_BUTTON, (el) => true).catch(() => false)
    return exists
  } catch (error) {
    log('Error:', error);
  }
  return false
}