import { test } from "../fixtures/base";
import { DATA_SIGNER, FOLDER_NAME, TOAST_MESSAGE, SIGNERS_DATA } from "../testData";

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
        await test.step('Create Folder', async () => {
            await signPage.sideMenu.clickDocuments();
            await documentsPage.clickCreateFolderBtn();
            await createFolderModal.fillNewFolderName(FOLDER_NAME);
            await createFolderModal.clickCreateBtn();
            await documentsPage.sideMenu.clickSign();
            await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderCreated);
    })
};
export const createForm = async (
    signPage, formsPage, createEditFormPage, prepareForSignatureModal, successModal) => {
    await signPage.sideMenu.clickForms();

    await formsPage.clickCreateFormBtn();
    await createEditFormPage.fillFormNameField(SIGNERS_DATA.signerName1);
    await createEditFormPage.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);
    await createEditFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
    await createEditFormPage.clickFillTemplateBtn();

    await prepareForSignatureModal.clickSignFieldItem();
    await prepareForSignatureModal.doCanvasClicks();
        
    await prepareForSignatureModal.clickInitialFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();

    await prepareForSignatureModal.clickDateFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();

    await prepareForSignatureModal.clickCreateBtn();
    await successModal.clickBackToFormsBtn();
    await signPage.sideMenu.clickSign()
}