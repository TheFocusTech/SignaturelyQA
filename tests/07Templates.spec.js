import { expect } from "@playwright/test";
import { test, loginBusinessUser, createTemplate } from "../fixtures/base.js"
import { TOASTER_MESSAGE, URL_END_POINTS } from "../testData";
import TemplatesActivePage from "../page_objects/templatesActivePage.js";
const BASE_URL = process.env.URL;

test.describe('Templates', () => {

	test('TC_07_29_01 | Verify that user can create template', async ({ page, loginBusinessUser, createTemplate }) => {

		const templatesActivePage = new TemplatesActivePage(page);

		await templatesActivePage.locators.getToaster().waitFor({ state: 'visible' });
		await expect(templatesActivePage.locators.getToaster()).toHaveText(TOASTER_MESSAGE.teplateSaved);
		await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.templates_active_end_point);

		await templatesActivePage.clickSelectOptionsBtn();
		await templatesActivePage.clickDeleteBtn();
		await templatesActivePage.clickDeleteYesBtn();

		const signPage = await templatesActivePage.clickSignSidebarLink();
		await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);

	});
})