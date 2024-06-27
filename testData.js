export const URL_END_POINTS = {
    signEndPoint: '/sign',
    documentsEndPoint: '/documents',
    activateTrialEndPoint: '/activate-trial',
    settingsBillingPlanEndPoint: '/settings/billing/plan',
    signUpPersonalEndPoint: '/signup/personal',
    settingsBillingEndPoint: '/settings/billing',
    settingsCompanyEndPoint: '/settings/company',
    signUpTrialEndPoint: '/signup',
    confirmAccountEndPoint: '/confirm-account',
    signUpFree: '/signup/free',
};
export const ACTIVE_COLOR = 'rgb(0, 163, 250)';
export const FILL_FOLDER_NAME = 'Folder 1';

export const TOAST_MESSAGE = {
    planSuccessChange: 'Plan has been successfully changed.',
    planRenew: 'Plan has been renew',
    folderDeleted: 'Folder deleted successfully.',
    copyApiKey: 'API key successfully copied to clipboard',
    deleteApiKey: 'API key successfully deleted',
    folderRename: 'Folder successfully updated!',
    folderCreated: 'Folder created!',
    signatureCreated: 'Signature created successfully',
    success: 'Document successfully saved!',
    fileMovedToFolder: 'Files successfully moved!',
    profileUpdated: 'Profile information updated.',
    checkYourEmail: 'Check your new email to confirm it',
    emailConfirmed: 'Email confirmed',
    sendReminder: 'Reminder(s) has been sent',
    documentSubmited: 'Document submitted.',
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

export const CREATE_TEMPLATE = {
    nameField: 'Rental contract',
    optionalMessage: 'USA',
    nameRole: 'Boss',
}
export const PLANS = ["Personal", "Business"];
export const RANDOM_ANNUALLY_PLAN = (randomPlan) => `${randomPlan} Annually Plan`;

export const DOCUMENT_TITLE = 'Document';
export const DOCUMENT_STATUS = {
    awaiting: 'awaiting',
    draft: 'draft',
    completed: 'completed',
    live: 'live',
    processing: 'processing',
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
export const TEMPLATES_STATUS = {
    live: 'Live',
    api: 'api',
}

export const SUBSCRIPTIONS = ["Monthly", "Annually"];
export const SUBSCRIBE_TO_PERSONAL_PLAN = 'Subscribe to personal Plan';
export const PLEASE_ENTER_CONFIRMATION_CODE = 'Please enter confirmation code';
export const PERSONAL_PLAN_DESCRIPTION = (billingPeriod) => `Your plan (Billed ${billingPeriod})Personal`;
export const EMAIL_SUBJECTS = {
    reminderToSign: "Reminder, Please sign",
    signatureRequest: "requested your signature",
    emailConfirmation: 'Signaturely Email Confirmation',
    sentToView: 'Sent you a document to view',
}
export const SELECTORS = {
    link: 'span',
    message: 'td p:has(a)',
}

export const SIGNER_ME = 'Me (Now)';

export const SIGNERS_DATA = {
    signerName1: `${process.env.EMAIL_PREFIX}${'001'}`,
    signerEmail1: `${process.env.EMAIL_PREFIX}${'001'}${process.env.EMAIL_DOMAIN}`,
    signerName2: `${process.env.EMAIL_PREFIX}${'002'}`,
    signerEmail2: `${process.env.EMAIL_PREFIX}${'002'}${process.env.EMAIL_DOMAIN}`,
    viewerEmail1: `${process.env.EMAIL_PREFIX}${'003'}${process.env.EMAIL_DOMAIN}`
};

export const FOLDER_NAME = 'Folder for documents';
export const UPLOAD_FILE_PATH = {
    jpgDocument: 'testDocuments/picture.jpg',
    xlsxDocument: 'testDocuments/todoList.xlsx'
};
export const UPLOAD_FILE_NAME = {
    jpgDocument: 'picture.jpg',
};
export const NO_ATTACHED_CARD = 'Current Card:No attached card';

export const SUBMIT_TITLE = 'Thanks for Submitting your Document';
export const SERVICE_NAME = 'Signaturely';
export const EMAIL_MESSAGE = " sent you the following document to view"