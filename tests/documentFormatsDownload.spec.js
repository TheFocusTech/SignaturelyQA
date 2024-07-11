import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { UPLOAD_FILE_PATH, DOCUMENT_STATUS } from '../testData.js';
import { description, severity, Severity, epic, feature } from 'allure-js-commons';

test.describe('Out of scope. Verify document formats to download.', () => {
    const documentsList = Object.values(UPLOAD_FILE_PATH);
    documentsList.forEach((document) => {
        let format = '.' + document.split('.').pop();
        test(`Verify document formats to download ${format}`, async ({
          createBusinessUserAndLogin,
          signPage,
          documentsPage,
        }) => {
          await description (`To verify ${format} document format can be downloaded`);
          await severity(Severity.CRITICAL);
          await epic('Verification of supporting tests');
          await feature('document formats');

          await signPage.uploadFileTab.fileUploader.uploadFile(document);
          await signPage.sideMenu.clickDocuments();

          expect(await documentsPage.table.getDocumentStatusText()).toBe(DOCUMENT_STATUS.draft);
        });
    });
});
