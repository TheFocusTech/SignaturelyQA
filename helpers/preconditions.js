import { DATA_SIGNER } from "../testData";
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

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
    await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFile.clickPrepareDocumentBtn();
    await prepareForSignatureModal.clickSendForSignatureRadioBtn();
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1, 0)
    await prepareForSignatureModal.fillSignerEmailField(process.env.PREFIX_EMAIL + '01' + process.env.EMAIL_DOMAIN, 0);
    await prepareForSignatureModal.clickContinueBtn();
    await prepareForSignatureModal.clickGotItBtn();

    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();
    await prepareForSignatureModal.clickSaveBtn();
}