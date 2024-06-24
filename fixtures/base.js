import { test as base } from "@playwright/test";
import SignPage from "../page_objects/signPage";
import { api_user_sign_up } from '../newUserUtils/apiUtilsForNewUser.js';
import { databaseConfirmNewUserEmail } from '../newUserUtils/dbUtilsForNewUser.js';
import { newFreeUserLogin, upgradeFreeUserToBusinessAndLogin } from '../newUserUtils/uiUtilsForNewUser.js';
import NewSignPage from '../new_pom/pages/sign/signPage.js';
import NewDocumentsPage from '../new_pom/pages/documents/documentsPage.js';
import NewDocumentsTrashPage from '../new_pom/pages/documents/documentsTrashPage.js';
import PrepareForSignatureModal from '../new_pom/modalWindows/prepareForSignatureModal.js';
import ActivateTrialStripePage from "../new_pom/pages/activateTrialStripePage";
import NewSettingsCompanyPage from "../new_pom/pages/settings/settingsCompanyPage.js";
import NewSettingsBillingPage from "../new_pom/pages/settings/settingsBillingPage.js";
import NewSettingsBillingPlanPage from "../new_pom/pages/settings/settingsBillingPlanPage.js";
import UpgradeYourPlanModal from "../new_pom/modalWindows/upgradeYourPlanModal";
import SpecialOneTimeOfferModal from "../new_pom/modalWindows/specialOneTimeOfferModal";
import CreateSignatureOrInitialModal from "../new_pom/modalWindows/createSignatureOrInitialModal.js";
import FinalStepPage from '../new_pom/pages/finalStepPage.js';
import SuccessModal from '../new_pom/modalWindows/successModal.js';
import EditAndResendDocumentModal from "../new_pom/modalWindows/editAndResendDocumentModal.js";
import DowngradeToPersonalPlanModal from "../new_pom/modalWindows/downgradeToPersonalPlanModal.js"
import NewSettingsAPIPage from "../new_pom/pages/settings/settingsAPIPage";
import NewCreateAPIKeyModal from "../new_pom/modalWindows/createAPIKeyModal.js";
import NewTemplatesPage from "../new_pom/pages/templates/templatesPage.js";
import SignUpPersonalPage from "../new_pom/pages/signUpPersonalPage";
import ConfirmCodeModal from "../new_pom/modalWindows/confirmCodeModal";
import ChooseSignatureOrInitialModal from "../new_pom/modalWindows/chooseSignatureOrInitialModal";
import CreateOrEditSignatureOnSettingModal from "../new_pom/modalWindows/createOrEditSignatureOnSettingModal";
import NewSettingsEditSignaturePage from "../new_pom/pages/settings/settingsEditSignaturePage";
import NewLoginPage from "../new_pom/pages/loginPage";
import ApiTemplatesPage from "../new_pom/pages/templates/apiTemplatesPage.js";
import FormsPage from "../new_pom/pages/forms/formsPage.js";
import CreateEditFormPage from "../new_pom/pages/forms/createEditFormPage.js";
import CreateFolderModal from "../new_pom/modalWindows/createFolderModal.js";
import MoveToFolderModal from "../new_pom/modalWindows/moveToFolderModal.js";
import SettingsProfilePage from "../new_pom/pages/settings/settingsProfilePage.js";

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
        await use(new NewLoginPage(page));
    },

    signPage: async ({ page }, use) => {
        await use(new NewSignPage(page));
    },

    prepareForSignatureModal: async ({ page }, use) => {
        await use(new PrepareForSignatureModal(page));
    },

    documentsPage: async ({ page }, use) => {
        await use(new NewDocumentsPage(page));
    },

    documentsTrashPage: async ({ page }, use) => {
        await use(new NewDocumentsTrashPage(page));
    },

    activateTrialStripePage: async ({ page }, use) => {
        await use(new ActivateTrialStripePage(page));
    },

    settingsCompanyPage: async ({ page }, use) => {
        await use(new NewSettingsCompanyPage(page));
    },

    settingsBillingPage: async ({ page }, use) => {
        await use(new NewSettingsBillingPage(page));
    },

    settingsBillingPlanPage: async ({ page }, use) => {
        await use(new NewSettingsBillingPlanPage(page));
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
        await use(new NewTemplatesPage(page));
    },

    settingsAPIPage: async ({ page }, use) => {
        await use(new NewSettingsAPIPage(page));
    },

    createAPIKeyModal: async ({ page }, use) => {
        await use(new NewCreateAPIKeyModal(page));
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
        await use(new NewSettingsEditSignaturePage(page));
    },

    apiTemplatesPage: async ({ page }, use) => {
        await use(new ApiTemplatesPage(page));
    },

    formsPage: async ({ page }, use) => {
        await use(new FormsPage(page));
    },

    createEditFormPage: async ({ page }, use) => {
        await use(new CreateEditFormPage(page));
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
});

