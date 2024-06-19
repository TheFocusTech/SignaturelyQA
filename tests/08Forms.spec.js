import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS } from "../testData.js";

test.describe('Sign Document', () => {

  test('TC_08_32_01 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {
    test.setTimeout(120 * 1000);

    signPage.sideMenuComponent.clickForms();
    
