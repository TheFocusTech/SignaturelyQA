import {
    DATA_SIGNER,
    TOAST_MESSAGE,
    CREATE_TEMPLATE,
    UPLOAD_FILE_PATH,
    SIGNERS_DATA,
    EMAIL_SUBJECTS,
    API_PLANS,
} from '../testData';
import { step } from 'allure-js-commons';
import { retrieveUserEmailConfirmationLink } from '../helpers/utils.js';

export const createSignature = async (
    signPage,
    settingsCompanyPage,
    settingsEditSignaturePage,
    createOrEditSignatureOnSettingModal
) => {
    await step('Precondition: Create signature ', async () => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickEditSignature();
        await settingsEditSignaturePage.clickCreateSignatureBtn();
        await createOrEditSignatureOnSettingModal.fillFullNameField(DATA_SIGNER.fullName);
        await createOrEditSignatureOnSettingModal.fillInitialsField(DATA_SIGNER.initials);
        await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
        await createOrEditSignatureOnSettingModal.clickCreateSignatureBtn();
        await settingsCompanyPage.sideMenu.clickSign();
    });
};

export const createDocumentAwaiting = async (
    signPage,
    prepareForSignatureModal,
    documentsPage,
    successModal,
    finalStepPage
) => {
    await step('Precondition: Document creation in progress with Awaiting status ', async () => {
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();

        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.waitAndClickSendForSignatureBtn(TOAST_MESSAGE.success);
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.sideMenu.clickSign();
    });
};

export const createFolder = async (signPage, documentsPage, createFolderModal, folderName) => {
    await step('Precondition: Create Folder', async () => {
        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickCreateFolderBtn();
        await createFolderModal.fillNewFolderName(folderName);
        await createFolderModal.clickCreateBtn();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderCreated);
        await documentsPage.sideMenu.clickSign();
    });
};

export const createTemplate = async (
    signPage,
    prepareForSignatureModal,
    templatesPage,
    createNewTemplatePage,
    successModal
) => {
    await step('Precondition: Create Template', async () => {
        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await createNewTemplatePage.fileUploader.uploadFile(UPLOAD_FILE_PATH.txtDocument);
        await createNewTemplatePage.clickFillTemplateBtn();
        await prepareForSignatureModal.waitDocumentSection();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.toast.clickToastFirstCloseBtn();
        await successModal.clickBackToTemplatesBtn();
        await templatesPage.sideMenu.clickSign();
    });
};

export const createForm = async (signPage, formsPage, createFormPage, prepareForSignatureModal, successModal) => {
    await step('Precondition: Create Form', async () => {
        await signPage.sideMenu.clickForms();
        await formsPage.clickCreateFormBtn();
        await createFormPage.createUpdateForm.fillFormNameField(SIGNERS_DATA.signerName1);
        await createFormPage.createUpdateForm.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);
        await createFormPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await createFormPage.createUpdateForm.clickFillTemplateBtn();

        await prepareForSignatureModal.clickNameOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickInitialOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickDateOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.success);
        await successModal.clickBackToFormsBtn();
        await formsPage.sideMenu.clickSign();
    });
};

export const createDocumentCompleted = async (
    signPage,
    prepareForSignatureModal,
    createSignatureOrInitialModal,
    finalStepPage,
    successModal,
    documentsPage
) => {
    await step('Precondition: Document creation in progress with Completed status ', async () => {
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await createSignatureOrInitialModal.clickCheckboxAgree();
        await createSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.clickSignDocumentBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.sideMenu.clickSign();
    });
};

export const uploadDraftDocument = async (signPage) => {
    await step('Precondition: Upload draft document', async () => {
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.pdfDocument);
    });
};

export const createThreeDocuments = async (signPage) => {
    await step(
        `Precondition: Create Documents "${UPLOAD_FILE_PATH.pdfDocument}", 
        "${UPLOAD_FILE_PATH.xlsxDocument}", 
        "${UPLOAD_FILE_PATH.csvDocument}"`,
        async () => {
            await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.pdfDocument);
            await signPage.signPageReload();
            await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
            await signPage.signPageReload();
            await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.csvDocument);
        }
    );
};

export const addTeamMember = async (
    teamMemberRole,
    teamMemberEmail,
    teamMemberName,
    page,
    request,
    signPage,
    teamPage,
    addTeamMemberModal,
    teamsAcceptInvitePage
) => {
    await step(`Precondition: Add team member with "${teamMemberRole}" role set`, async () => {
        await signPage.sideMenu.clickTeam();
        await teamPage.clickAddTeamMemberButton();
        await addTeamMemberModal.fillTeamMemberEmailInputField(teamMemberEmail);
        await addTeamMemberModal.fillTeamMemberNameInputField(teamMemberName);
        (await addTeamMemberModal.isTeamMemberRoleSet(teamMemberRole))
            ? null
            : await addTeamMemberModal.changeTeamMemberRole(teamMemberRole);
        await addTeamMemberModal.clickSendInvitesButton();
        const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
        const inviteLink = await retrieveUserEmailConfirmationLink(request, teamMemberEmail, emailSubject);
        await step('Navigate to the invite link', async () => {
            await page.goto(inviteLink);
        });
        await teamsAcceptInvitePage.clickBackToMainPageButton();
        await teamsAcceptInvitePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.inviteAccepted);
    });
};

export const userWithGoldAPISubscription = async (
    createBusinessUserAndLogin,
    signPage,
    settingsCompanyPage,
    settingsAPIPage,
    upgradeYourPlanAPIModal
) => {
    await step('Precondition: User with Gold API subscription', async () => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();
        await settingsAPIPage.clickUpgradeButton(API_PLANS[0]);
        await upgradeYourPlanAPIModal.clickSubscribeButton();
    });
};

export const createTemplateForBulkSend = async (
    signPage,
    prepareForSignatureModal,
    templatesPage,
    createNewTemplatePage,
    successModal
) => {
    await step('Precondition: Create Template for Bulk Send', async () => {
        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await createNewTemplatePage.fileUploader.uploadFile(UPLOAD_FILE_PATH.txtDocument);
        await createNewTemplatePage.clickFillTemplateBtn();
        await prepareForSignatureModal.setSignFieldOnDocument();
        await prepareForSignatureModal.clickCreateBtn();
        await successModal.clickBackToTemplatesBtn();
        await templatesPage.sideMenu.clickSign();
    });
};

export const uploadAvatar = async (signPage, settingsCompanyPage, settingsProfilePage, uploadAvatarImageModal) => {
    await step('Preconditions: Upload avatar image', async () => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.uploadImage(UPLOAD_FILE_PATH.jpgDocument);
        await uploadAvatarImageModal.clickSaveButton();
        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.pictureUploaded);
        await settingsProfilePage.sideMenu.clickSign();
    });
};
