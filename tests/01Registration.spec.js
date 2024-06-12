import { expect } from "@playwright/test";
import { test } from "../fixtures/base"
import { retrieveUserEmailConfirmationLink, createNewUserThroughApi } from "../helpers/utils";
import { URL_END_POINTS, START_YOUR_FREE_TRIAL_STATEMENT, BILLING_INFORMATION } from "../testData";
import ActivateTrialStripePage from "../page_objects/activateTrialStripePage";

test('TC_01_01_02 | Verify that user redirects to the Activate-trial page', async ({page, request}) => {
    const newUserData = await createNewUserThroughApi(request);
    const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);

    await page.goto(confirmationLink);
    await page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);

    const activateTrialStripePage = new ActivateTrialStripePage(page);
    await expect(activateTrialStripePage.locators.getUserHeaderName()).toHaveText(newUserData.name);
    await expect(activateTrialStripePage.locators.getFreeTrialStatement()).toContainText(START_YOUR_FREE_TRIAL_STATEMENT);
    await expect(activateTrialStripePage.locators.getBillingInfoHeader()).toHaveText(BILLING_INFORMATION)
})