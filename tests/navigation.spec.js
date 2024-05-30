import { test, expect } from '@playwright/test';

test('Navigate to login page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Log In | Signaturely');
});

test.only('Sign a document custom signing order', async ({ page }) => {
  await page.goto('/');
  await page.locator('.react-sanfona-item sidebar__item a[href="/sign"]', { hasText: 'Sign' }).click();
  await page.locator('.upload__content-button button').click();
  
  await page.setInputFiles('input[type="file"]', 'test.png');
  await getByRole(page, 'button', { name: 'Upload' }).click();
  await page.waitForSelector('.upload__status-text upload__status-item button.button cancel');

  await getByRole(page, 'button', { name: 'Prepare Document' }).click();
  await page.waitForTimeout(5000);

  await getByLabel(page, 'radio-button__label', { name: 'Send for Signature' }).click();
  await page.locator('.addButton__icon emailRecipients__add-icon p', { hasText: 'Add signer' }).click();

  await getByPlaceholder(page, 'Name').fill('John');
  await getByPlaceholder(page, 'Email').fill('a@a.com');

  await page.locator('.addButton__icon emailRecipients__add-icon p', { hasText: 'Add signer' }).click();
  await getByPlaceholder(page, 'Name').fill('John');
  await getByPlaceholder(page, 'Email').fill('a@a.com');

  await page.locator('p.uiCheckbox__label').first().click();

  await expect(page).locator('.signers__item-order-position').toBeVisible();

});
