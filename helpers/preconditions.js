import { DATA_SIGNER, SIGNERS_DATA,FOLDER_NAME, TOAST_MESSAGE } from "../testData";

export const createSignature = async (signPage, settingsCompanyPage, settingsEditSignaturePage, createOrEditSignatureOnSettingModal) => {
    await signPage.sideMenu.clickSettings();
    await settingsCompanyPage.sideMenuSettings.clickEditSignature();
    await settingsEditSignaturePage.clickCreateSignatureBtn();
    await createOrEditSignatureOnSettingModal.fillFullNameField(DATA_SIGNER.fullName);
    await createOrEditSignatureOnSettingModal.fillInitialsField(DATA_SIGNER.initials);
    await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
    await createOrEditSignatureOnSettingModal.clickCreateSignatureBtn();
    await settingsCompanyPage.sideMenu.clickSign();
};

export const createFolder = async (
    signPage,
    documentsPage,
    createFolderModal) => {
    await signPage.sideMenu.clickDocuments();
    await documentsPage.clickCreateFolderBtn();
    await createFolderModal.fillNewFolderName(FOLDER_NAME);
    await createFolderModal.clickCreateBtn();
    await documentsPage.sideMenu.clickSign();
    await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderCreated);
}

export const createForm = async (signPage, 
    prepareForSignatureModal, createFormPage, formsPage, successModal) => {
    await signPage.sideMenu.clickForms();
    await formsPage.clickCreateFormBtn();
    await createFormPage.fillFormNameField(SIGNERS_DATA.signerName1);
    await createFormPage.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);
    await createFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
    await createFormPage.clickFillTemplateBtn();
    await prepareForSignatureModal.clickNameFieldItem();
    await prepareForSignatureModal.doCanvasClicks();
    await prepareForSignatureModal.clickSignFieldItem();
    await prepareForSignatureModal.doCanvasClicks();
    await prepareForSignatureModal.clickCreateBtn();
    await successModal.clickBackToFormsBtn();
}