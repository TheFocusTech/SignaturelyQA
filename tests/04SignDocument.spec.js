import { test, expect } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;

test.describe('SignDocument', () => {

    test.only('TC_04_11_02 | Verify custom signing order', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');
        await loginPage.fillEmailAddressInputField(EMAIL);
        await loginPage.fillPasswordInputField(PASSWORD);
        const signPage = await loginPage.clickLoginAndGoSignPage();

        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles('testDocuments/picture.jpg');


        await page.waitForFunction(selector => {
        const button = document.querySelector(selector);
        if (!button) return false;
        return !button.disabled && button.getAttribute('aria-disabled') !== 'true';
        }, 'div.wizardSignForm-createButton button');
        await page.locator('div.wizardSignForm-createButton button').click();

        await page.locator('div.radio-button__wrapper ').last().click();
        await page.locator('form.wizardSignForm__form p:nth-child(2)').first().click();

        await page.locator('div.form__field .form__input').first().fill('John2');
        await page.locator('div.form__field .form__input').last().fill('a@a.com');

        await page.locator('form.wizardSignForm__form p:nth-child(2)').first().click();

        await page.locator('div.form__field .form__input').first().fill('John');
        await page.locator('div.form__field .form__input').last().fill('a@a.com');

        await page.locator('div.uiCheckbox').click();

        await expect(page.locator('span.signers__item-order-position').first()).toBeVisible();
        await expect(page.locator('span.signers__item-order-position').last()).toBeVisible();

    })

})