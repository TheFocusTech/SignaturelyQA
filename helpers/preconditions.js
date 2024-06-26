import { DATA_SIGNER, FOLDER_NAME, TOAST_MESSAGE } from "../testData";
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