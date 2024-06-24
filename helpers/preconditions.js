import { DATA_SIGNER, FOLDER_NAME, TOAST_MESSAGE } from "../testData";
import { test } from "../fixtures/base";

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

export const createCompletedField = async (signPage, prepareForSignatureModal, chooseSignatureOrInitialModal, finalStepPage, successModal) => {
    await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');   
    await signPage.uploadFileTab.clickPrepareDocumentBtn();   

    await prepareForSignatureModal.clickSignDocumentRadioBtn();
    await prepareForSignatureModal.clickContinueBtn();
    await prepareForSignatureModal.clickGotItBtn(); 
    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();
    await prepareForSignatureModal.clickCustomSigningOrderCheckbox();   
    await chooseSignatureOrInitialModal.clickSignNowBtn();
    await prepareForSignatureModal.clickSaveBtn();
    await finalStepPage.clickSignDocumentBtn();
    await successModal.clickBackToDocumentsBtn();
};