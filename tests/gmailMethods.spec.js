import { test } from '../fixtures/base';
import { expect } from '@playwright/test';
import { CARD_DETAILS, EMAIL_SUBJECTS, SELECTORS } from '../testData';
import { retrieveEmailMessage } from '../helpers/utils';
import { description, severity, Severity, epic } from 'allure-js-commons';

// sample test to check how Gmail method - checkEmailMessageReceived() works
test.describe('Verification of supporting tests.', () => {
    test('Verify Email message is received', async ({ request }) => {
        await description('To verify Email message is received.');
        await severity(Severity.CRITICAL);
        await epic('Verification of supporting tests');
        await feature('Gmail');

        const exampleUser = {
            user1: {
                from: 'LG_tester',
                to: `${process.env.EMAIL_PREFIX}05${process.env.EMAIL_DOMAIN}`,
                userEmail: `${process.env.EMAIL_PREFIX}42${process.env.EMAIL_DOMAIN}`,
                subject: `${EMAIL_SUBJECTS.reminderToSign}`,
                messageCss: `${SELECTORS.link}`,
            },
            user2: {
                from: `${CARD_DETAILS.VISA.fullNameOnCard}240620144455730`,
                to: `${process.env.EMAIL_PREFIX}01${process.env.EMAIL_DOMAIN}`,
                userEmail: `${process.env.EMAIL_PREFIX}240620144455730${process.env.EMAIL_DOMAIN}`,
                subject: `${EMAIL_SUBJECTS.signatureRequest}`,
                messageCss: `${SELECTORS.link}`,
            },
            user3: {
                from: 'Signaturely',
                to: `${process.env.EMAIL_PREFIX}240626115809663003${process.env.EMAIL_DOMAIN}`,
                userName: `${CARD_DETAILS.VISA.fullNameOnCard}240626115809663`,
                userEmail: `${process.env.EMAIL_PREFIX}240626115809663${process.env.EMAIL_DOMAIN}`,
                subject: `${EMAIL_SUBJECTS.sentToView}`,
                messageCss: `${SELECTORS.message}`,
            },
        };
        const emailBody = await retrieveEmailMessage(
            request,
            exampleUser.user1.from,
            exampleUser.user1.to,
            exampleUser.user1.subject,
            exampleUser.user1.messageCss
        );
        const emailBody1 = await retrieveEmailMessage(
            request,
            exampleUser.user2.from,
            exampleUser.user2.to,
            exampleUser.user2.subject,
            exampleUser.user2.messageCss
        );
        const emailBody2 = await retrieveEmailMessage(
            request,
            exampleUser.user3.from,
            exampleUser.user3.to,
            exampleUser.user3.subject,
            exampleUser.user3.messageCss
        );

        await expect(emailBody).toEqual(
            `${exampleUser.user1.from} (${exampleUser.user1.userEmail}) sent you a reminder`
        );
        await expect(emailBody1).toEqual(
            `${exampleUser.user2.from} (${exampleUser.user2.userEmail}) has requested your signature`
        );
        await expect(emailBody2).toEqual(
            `${exampleUser.user3.userName} (${exampleUser.user3.userEmail}) sent you the following document to view`
        );
    });
});

