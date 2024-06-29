import { DATA_SIGNER, FOLDER_NAME, TOAST_MESSAGE, CREATE_TEMPLATE, UPLOAD_FILE_PATH, SIGNERS_DATA } from "../testData";
import { step } from "allure-js-commons";

export const createSignature = async (signPage, settingsCompanyPage, settingsEditSignaturePage, createOrEditSignatureOnSettingModal) => {
    await step('Precondition: Create signature ', async () => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickEditSignature();
        await settingsEditSignaturePage.clickCreateSignatureBtn();
        await createOrEditSignatureOnSettingModal.fillFullNameField(DATA_SIGNER.fullName);
        await createOrEditSignatureOnSettingModal.fillInitialsField(DATA_SIGNER.initials);
        await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
        await createOrEditSignatureOnSettingModal.clickCreateSignatureBtn();
        await settingsCompanyPage.sideMenu.clickSign();
    })
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

export const createFolder = async (signPage, documentsPage, createFolderModal) => {
    await step('Precondition: Create Folder', async () => {
        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickCreateFolderBtn();
        await createFolderModal.fillNewFolderName(FOLDER_NAME);
        await createFolderModal.clickCreateBtn();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderCreated);
        await documentsPage.sideMenu.clickSign();
    });
};

export const createTemplate = async (signPage, prepareForSignatureModal, templatesPage, createNewTemplatePage) => {
    await step('Precondition: Create Template', async () => {
        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await createNewTemplatePage.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await createNewTemplatePage.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTemplatesBtn();
        await templatesPage.sideMenu.clickSign();
    });
};

export const createForm = async (signPage, prepareForSignatureModal, createFormPage, formsPage, successModal) => {
    await step('Precondition: Create Form', async () => {
        await signPage.sideMenu.clickForms();
        await formsPage.clickCreateFormBtn();
        await createFormPage.fillFormNameField(SIGNERS_DATA.signerName1);
        await createFormPage.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);
        await createFormPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await createFormPage.clickFillTemplateBtn();
        await prepareForSignatureModal.clickNameOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickDateOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickCreateBtn();
        await successModal.clickBackToFormsBtn();
        await formsPage.sideMenu.clickSign();
    });
};

export const uploadDocumentForDraft = async (signPage, prepareForSignatureModal) => {
    await step('Precondition: Upload document for draft', async () => {    
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickCancelBtn();        
    });
};
