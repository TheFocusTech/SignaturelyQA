import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";
import NewSignPage from "../new_pom/sign/signPage.js";

test.describe('CreateDocument', () => {

  test('TC_03_07_01 | Sign a document', async ({ page, createBusinessUserAndLogin }) => {

    const signPage = new NewSignPage(page);
    await signPage.sideMenu.clickSignMenu();

    await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');


  })
})