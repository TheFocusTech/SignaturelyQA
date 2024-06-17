import { expect } from "@playwright/test";
import { test } from "../fixtures/base"
import { retrieveUserEmailConfirmationLink, createNewUserThroughApi } from "../helpers/utils";
import { URL_END_POINTS, START_YOUR_FREE_TRIAL_STATEMENT, BILLING_INFORMATION } from "../testData";

test.skip('TC_01_01_02 | Verify that user redirects to the Activate-trial page', async ({page, request, activateTrialStripePage}) => {
    const newUserData = await createNewUserThroughApi(request);
    const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);

    await page.goto(confirmationLink);
    await page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);

    await expect(activateTrialStripePage.userHeaderName).toHaveText(newUserData.name);
    await expect(activateTrialStripePage.freeTrialStatement).toContainText(START_YOUR_FREE_TRIAL_STATEMENT);
    await expect(activateTrialStripePage.billingInfoHeader).toHaveText(BILLING_INFORMATION)
})