import { DATA_SIGNER, FOLDER_NAME, TOAST_MESSAGE, CREATE_TEMPLATE, UPLOAD_FILE_PATH, SIGNERS_DATA } from "../testData";
import { test } from "../fixtures/base";
import { step } from "allure-js-commons";

export const createSignature = async (signPage, settingsCompanyPage, settingsEditSignaturePage, createOrEditSignatureOnSettingModal) => {
    await signPage.sideMenu.clickSettings();
    await settingsCompanyPage.sideMenuSettings.clickEditSignature();
    await settingsEditSignaturePage.clickCreateSignatureBtn();
    await createOrEditSignatureOnSettingModal.fillFullNameField(DATA_SIGNER.fullName);
    await createOrEditSignatureOnSettingModal.fillInitialsField(DATA_SIGNER.initials);
    await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
    await createOrEditSignatureOnSettingModal.clickCreateSignatureBtn();
    await settingsCompanyPage.sideMenu.clickSign();

}

export const createDocumentAwaiting = async (
    signPage,
    prepareForSignatureModal,
    documentsPage,
    successModal,
    finalStepPage) => {
    await step('Document creation in progress with Awaiting status ', async () => {
        await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0)
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();

        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.waitAndClickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.sideMenu.clickSign();
    })

};

export const createFolder = async (
    signPage,
    documentsPage,
    createFolderModal) => {

    await step('Precondition: Create Folder', async () => {
        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickCreateFolderBtn();
        await createFolderModal.fillNewFolderName(FOLDER_NAME);
        await createFolderModal.clickCreateBtn();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderCreated);
        await documentsPage.sideMenu.clickSign();
    })
};

export const createTemplate = async (signPage, prepareForSignatureModal, templatePage) => {
    await step('Create Template', async () => {
        await signPage.sideMenu.clickTemplates();
        await templatePage.sideMenuTemplates.clickCreateTemplate();
        await templatePage.createTemplate.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await templatePage.createTemplate.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await templatePage.createTemplate.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await templatePage.createTemplate.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTemplatesBtn();
        await templatePage.sideMenu.clickSign();
    })
};


