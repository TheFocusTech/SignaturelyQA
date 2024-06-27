import { test as base } from "@playwright/test";
import { api_user_sign_up } from '../newUserUtils/apiUtilsForNewUser.js';
import { databaseConfirmNewUserEmail } from '../newUserUtils/dbUtilsForNewUser.js';
import { newFreeUserLogin, upgradeFreeUserToBusinessAndLogin } from '../newUserUtils/uiUtilsForNewUser.js';
import SignPage from '../new_pom/pages/sign/signPage.js';
import DocumentsPage from '../new_pom/pages/documents/documentsPage.js';
import DocumentsTrashPage from '../new_pom/pages/documents/documentsTrashPage.js';
import PrepareForSignatureModal from '../new_pom/modalWindows/prepareForSignatureModal.js';
import ActivateTrialStripePage from "../new_pom/pages/signUp/activateTrialStripePage";
import SettingsCompanyPage from "../new_pom/pages/settings/settingsCompanyPage.js";
import SettingsBillingPage from "../new_pom/pages/settings/settingsBillingPage.js";
import SettingsBillingPlanPage from "../new_pom/pages/settings/settingsBillingPlanPage.js";
import UpgradeYourPlanModal from "../new_pom/modalWindows/upgradeYourPlanModal";
import SpecialOneTimeOfferModal from "../new_pom/modalWindows/specialOneTimeOfferModal";
import CreateSignatureOrInitialModal from "../new_pom/modalWindows/createSignatureOrInitialModal.js";
import FinalStepPage from '../new_pom/pages/finalStepPage.js';
import SuccessModal from '../new_pom/modalWindows/successModal.js';
import EditAndResendDocumentModal from "../new_pom/modalWindows/editAndResendDocumentModal.js";
import DowngradeToPersonalPlanModal from "../new_pom/modalWindows/downgradeToPersonalPlanModal.js"
import SettingsAPIPage from "../new_pom/pages/settings/settingsAPIPage";
import CreateAPIKeyModal from "../new_pom/modalWindows/createAPIKeyModal.js";
import TemplatesPage from "../new_pom/pages/templates/templatesPage.js";
import SignUpPersonalPage from "../new_pom/pages/signUp/signUpPersonalPage";
import ConfirmCodeModal from "../new_pom/modalWindows/confirmCodeModal";
import ChooseSignatureOrInitialModal from "../new_pom/modalWindows/chooseSignatureOrInitialModal";
import CreateOrEditSignatureOnSettingModal from "../new_pom/modalWindows/createOrEditSignatureOnSettingModal";
import SettingsEditSignaturePage from "../new_pom/pages/settings/settingsEditSignaturePage";
import LoginPage from "../new_pom/pages/loginPage";
import ApiTemplatesPage from "../new_pom/pages/templates/apiTemplatesPage.js";
import FormsPage from "../new_pom/pages/forms/formsPage.js";
import CreateFormPage from "../new_pom/pages/forms/createFormPage.js";
import CreateFolderModal from "../new_pom/modalWindows/createFolderModal.js";
import MoveToFolderModal from "../new_pom/modalWindows/moveToFolderModal.js";
import SettingsProfilePage from "../new_pom/pages/settings/settingsProfilePage.js";
import SignUpTrialPage from "../new_pom/pages/signUp/signUpTrialPage";
import SignUpFreePage from "../new_pom/pages/signUp/signUpFreePage";
import DocumentsAwaitingPage from "../new_pom/pages/documents/documentsAwaitingPage.js";
import SendReminderDocumentModal from "../new_pom/modalWindows/sendReminderDocumentModal.js";
import CreateNewTemplatePage from "../new_pom/pages/templates/createNewTemplatePage.js";
import NotRegisterSignerSignPage from '../new_pom/pages/notRegisterSignerSignPage.js';
import SignerAlmostDoneModal from '../new_pom/modalWindows/signerAlmostDoneModal.js';
import DocumentSubmitProccessModal from '../new_pom/modalWindows/documentSubmitProccessModal.js';
import UpdateFormPage from "../new_pom/pages/forms/updateFormPage.js";

export const test = base.extend({

    createNewFolder: [
        async ({ page }, use) => {
            const signPage = new SignPage(page);

            const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
            await documentsPage.clickCreateFolderBtn();
            await documentsPage.fillNewFolderNameInputField();
            await documentsPage.clickCreateBtn();
            await documentsPage.clickSignSidebarLinkAndGoSignPage();
            await documentsPage.locators.getToast().waitFor({ state: "visible" });
            await documentsPage.locators.getToast().waitFor({ state: "hidden" });

            await use("");
        },
        { scope: "test" },
    ],

    createFreeUserAndLogin: [
        async ({ request, page, loginPage }, use) => {
            await api_user_sign_up(request);
            await databaseConfirmNewUserEmail();
            await newFreeUserLogin({ page, loginPage });

            await use("");
        },
        { scope: "test" },
    ],

    createBusinessUserAndLogin: [
        async ({
            createFreeUserAndLogin,
            signPage,
            settingsCompanyPage,
            upgradeYourPlanModal,
            settingsBillingPlanPage,
            specialOneTimeOfferModal }, use) => {

            await upgradeFreeUserToBusinessAndLogin({
                signPage,
                settingsCompanyPage,
                upgradeYourPlanModal,
                settingsBillingPlanPage,
                specialOneTimeOfferModal
            });

            await use("");
        },
        { scope: "test" },
    ],

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    signPage: async ({ page }, use) => {
        await use(new SignPage(page));
    },

    prepareForSignatureModal: async ({ page }, use) => {
        await use(new PrepareForSignatureModal(page));
    },

    documentsPage: async ({ page }, use) => {
        await use(new DocumentsPage(page));
    },

    documentsAwaitingPage: async ({ page }, use) => {
        await use(new DocumentsAwaitingPage(page));
    },

    documentsTrashPage: async ({ page }, use) => {
        await use(new DocumentsTrashPage(page));
    },

    activateTrialStripePage: async ({ page }, use) => {
        await use(new ActivateTrialStripePage(page));
    },

    settingsCompanyPage: async ({ page }, use) => {
        await use(new SettingsCompanyPage(page));
    },

    settingsBillingPage: async ({ page }, use) => {
        await use(new SettingsBillingPage(page));
    },

    settingsBillingPlanPage: async ({ page }, use) => {
        await use(new SettingsBillingPlanPage(page));
    },

    upgradeYourPlanModal: async ({ page }, use) => {
        await use(new UpgradeYourPlanModal(page));
    },

    downgradeToPersonalPlanModal: async ({ page }, use) => {
        await use(new DowngradeToPersonalPlanModal(page))
    },

    specialOneTimeOfferModal: async ({ page }, use) => {
        await use(new SpecialOneTimeOfferModal(page));
    },

    createSignatureOrInitialModal: async ({ page }, use) => {
        await use(new CreateSignatureOrInitialModal(page));
    },

    finalStepPage: async ({ page }, use) => {
        await use(new FinalStepPage(page));
    },

    successModal: async ({ page }, use) => {
        await use(new SuccessModal(page));
    },

    editAndResendDocumentModal: async ({ page }, use) => {
        await use(new EditAndResendDocumentModal(page));
    },

    templatePage: async ({ page }, use) => {
        await use(new TemplatesPage(page));
    },

    settingsAPIPage: async ({ page }, use) => {
        await use(new SettingsAPIPage(page));
    },

    createAPIKeyModal: async ({ page }, use) => {
        await use(new CreateAPIKeyModal(page));
    },

    signUpPersonalPage: async ({ page }, use) => {
        await use(new SignUpPersonalPage(page));
    },

    confirmCodeModal: async ({ page }, use) => {
        await use(new ConfirmCodeModal(page));
    },

    chooseSignatureOrInitialModal: async ({ page }, use) => {
        await use(new ChooseSignatureOrInitialModal(page));
    },

    createOrEditSignatureOnSettingModal: async ({ page }, use) => {
        await use(new CreateOrEditSignatureOnSettingModal(page));
    },

    settingsEditSignaturePage: async ({ page }, use) => {
        await use(new SettingsEditSignaturePage(page));
    },

    apiTemplatesPage: async ({ page }, use) => {
        await use(new ApiTemplatesPage(page));
    },

    formsPage: async ({ page }, use) => {
        await use(new FormsPage(page));
    },

    createFormPage: async ({ page }, use) => {
        await use(new CreateFormPage(page));
    },

    moveToFolderModal: async ({ page }, use) => {
        await use(new MoveToFolderModal(page));
    },

    createFolderModal: async ({ page }, use) => {
        await use(new CreateFolderModal(page));
    },

    settingsProfilePage: async ({ page }, use) => {
        await use(new SettingsProfilePage(page));
    },

    signUpTrialPage: async ({ page }, use) => {
        await use(new SignUpTrialPage(page));
    },

    signUpFreePage: async ({ page }, use) => {
        await use(new SignUpFreePage(page));
    },

    sendReminderDocumentModal: async ({ page }, use) => {
        await use(new SendReminderDocumentModal(page));
    },

    createNewTemplatePage: async ({ page }, use) => {
        await use(new CreateNewTemplatePage(page));
    },

    notRegisterSignerSignPage: async ({ page }, use) => {
        await use(new NotRegisterSignerSignPage(page));
    },

    signerAlmostDoneModal: async ({ page }, use) => {
        await use(new SignerAlmostDoneModal(page));
    },

    documentSubmitProccessModal: async ({ page }, use) => {
        await use(new DocumentSubmitProccessModal(page));
    },
    updateFormPage: async ({ page }, use) => {
        await use(new UpdateFormPage(page));
    },
});

