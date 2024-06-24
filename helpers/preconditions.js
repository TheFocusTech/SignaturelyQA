
import { DATA_SIGNER, FOLDER_NAME, TOAST_MESSAGE, SIGNERS_DATA } from "../testData";
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

}

export const createDocumentAwaiting = async (signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage) => {
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
