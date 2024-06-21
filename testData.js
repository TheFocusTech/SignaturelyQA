export const URL_END_POINTS = {
    signEndPoint: '/sign',
    documentsEndPoint: '/documents',
    activateTrialEndPoint: '/activate-trial',
    settingsBillingPlanEndPoint: '/settings/billing/plan',
};
export const ACTIVE_COLOR = 'rgb(0, 163, 250)';
export const FILL_FOLDER_NAME = 'Folder 1';
export const CHOOSE_SIGNERS_FIELDS = {
    name1: 'John Doe',
    email1: '5kXUw@example.com',
    name2: 'John Doe2',
    email2: '5kXUw@example.com'
};
export const TOASTER_MESSAGE = {
    planSuccessChange: 'Plan has been successfully changed.',
    planRenew: 'Plan has been renew',
    folderDeleted: 'Folder deleted successfully.',
    copyApiKey: 'API key successfully copied to clipboard',
    deleteApiKey: 'API key successfully deleted',
    folderRename: 'Folder successfully updated!',
    folderCreated: 'Folder created!',
    signatureCreated: 'Signature created successfully',
    sendReminder: 'Reminder(s) has been sent',
};
export const API_KEY_NAME = 'Test Api Key';
export const NO_API_KEY_MESSAGE = 'You don\'t have any API keys yet.';
export const DATA_SIGNER = {
    fullName: 'May Li',
    initials: 'ML'
};
export const FILL_RENAME_FOLDER_NAME = 'FielderTest';
export const EMPTY_DOCUMENTS_HEADER = "You don't have any documents yet.";
export const EMPTY_TRASH_HEADER = "You don't have any deleted documents yet.";
export const FULL_NAME_INITIALS_FIELDS = {
    fullName: 'John Smith',
    initials: 'JS'
};
export const START_YOUR_FREE_TRIAL_STATEMENT = "Please add your payment details to start the free trial.";
export const BILLING_INFORMATION = "Billing Information";
export const PLANS = ["Personal", "Business"];
export const RANDOM_ANNUALLY_PLAN = (randomPlan) => `${randomPlan} Annually Plan`;
export const DOCUMENT_TITLE = 'Document';
export const DOCUMENT_STATUS = {
    awaiting: 'awaiting',
    draft: 'draft',
    completed: 'completed'
};
export const CI_USER_NAME = 'CI_user';
export const BUSINESS_MONTHLY_PLAN = "Your plan (Billed Monthly)Business";
export const FREE_PLAN_DESCRIPTION = "Your plan (Billed Monthly)Free";
export const CARD_DETAILS = {
    VISA: {
        fullNameOnCard: `TestUser`,
        cardNumber: '4242424242424242',
        expirationDate: '12 / 27',
        cvc: '111',
        countryOrRegion: 'US',
        zip: '20500',
        displayingOnTheBillingPage: 'Current Card:**** **** **** 424212/27',
        displayingOnTheBillingPortalPage: 'Visa •••• 4242DefaultExpires 12/2027Delete',
    },
    MASTERCARD: {
        fullNameOnCard: 'Tes Tester',
        cardNumber: '5555555555554444',
        expirationDate: '10 / 29',
        cvc: '321',
        countryOrRegion: 'US',
        zip: '20500',
        displayingOnTheBillingPage: 'Current Card:**** **** **** 444410/29',
        displayingOnTheBillingPortalPage: 'Mastercard •••• 4444DefaultExpires 10/2029Delete',
    },
    VISA_DEBIT: {
        fullNameOnCard: 'Tes Tester',
        cardNumber: '4000056655665556',
        expirationDate: '12 / 27',
        cvc: '123',
        countryOrRegion: 'US',
        zip: '20500',
        displayingOnTheBillingPage: 'Current Card:**** **** **** 555612/27',
        displayingOnTheBillingPortalPage: 'Visa •••• 5556DefaultExpires 12/2027Delete',
    }
};
export const END_PLAN = 'Your plan will end on';
export const MESSAGE = "Project 1";