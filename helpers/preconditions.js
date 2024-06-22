import { DATA_SIGNER } from "../testData";
import { SIGNERS_DATA } from "../testData.js";

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

export const prepareForSignature = async ( signPage, prepareForSignatureModal) => {
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
}