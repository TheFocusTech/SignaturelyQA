import {test} from "../fixtures/base";
import { expect } from "@playwright/test";
import {CARD_DETAILS, EMAIL_SUBJECTS} from "../testData";
import {retrieveEmailMessage} from "../helpers/utils";

// sample test to check how Gmail method - checkEmailMessageReceived() works
test('Verify that Email message received', async ({ request}) => {
    const exampleUser = {
        user1: {
            name: "LG_tester",
            email: `${process.env.EMAIL_PREFIX}42${process.env.EMAIL_DOMAIN}`,
            receiver: `${process.env.EMAIL_PREFIX}05${process.env.EMAIL_DOMAIN}`,
            subject: `${EMAIL_SUBJECTS.reminderToSign}`
        },
        user2: {
            name: `${CARD_DETAILS.VISA.fullNameOnCard}240620144455730`,
            email: `${process.env.EMAIL_PREFIX}240620144455730${process.env.EMAIL_DOMAIN}`,
            receiver: `${process.env.EMAIL_PREFIX}01${process.env.EMAIL_DOMAIN}`,
            subject: `${EMAIL_SUBJECTS.signatureRequest}`
        }
    }
    const emailBody = await retrieveEmailMessage(request, exampleUser.user1.name, exampleUser.user1.receiver, exampleUser.user1.subject);
    const emailBody1 = await retrieveEmailMessage(request, exampleUser.user2.name, exampleUser.user2.receiver, exampleUser.user2.subject);

    await expect(emailBody).toEqual(`${exampleUser.user1.name} (${exampleUser.user1.email}) sent you a reminder`)
    await expect(emailBody1).toEqual(`${exampleUser.user2.name} (${exampleUser.user2.email}) has requested your signature`)
})