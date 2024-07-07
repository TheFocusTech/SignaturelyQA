import ToastComponent from "../../components/toastComponent";
import SideMenuComponent from "../../components/sideMenuComponent";
import { step } from "allure-js-commons";

export default class SettingsProfilePage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);
        this.sideMenu = new SideMenuComponent(this.page);

        this.newPasswordInputField = this.page.getByPlaceholder('Password', { exact: true });
        this.repeatNewPasswordInputField = this.page.getByPlaceholder('Repeat Password');
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.deleteMyAccountBtn = this.page.getByRole('button', { name: 'Delete my Account' });
        this.emailAddressInputField = this.page.getByPlaceholder('username@gmail.com');
        this.updateBtn = this.page.getByRole('button', { name: "Update Email" });
        this.checkBoxesList = this.page.locator('.settings__form-checkbox .uiCheckbox')
        this.checkBoxesFrameList = this.page.locator('.settings__form-checkbox .uiCheckbox__inner')
        this.dateFormatDropdown = this.page.locator('.uiSelect__select').first();
        this.dateFormat = this.page.locator('.uiSelect__select-row');
        this.fileInput = this.page.locator('input[type = "file"]');
        this.avatarImage = this.page.locator('form').getByAltText('avatar');
    }

    async fillNewPasswordInputField(password) {
        await step('Fill "New Password" input field', async () => {
            await this.newPasswordInputField.type(password);
        });
    }

    async fillRepeatNewPasswordInputField(password) {
        await step('Fill "Repeate new Password" input field', async () => {
            await this.repeatNewPasswordInputField.type(password);
        });
    }

    async clickSaveButton() {
        await step('Click "Save" button', async () => {
            await this.saveButton.click();
        });
    }

    async clickDeleteMyAccountBtn() {
        await step('Click "Delete My Account" button', async () => {
            await this.deleteMyAccountBtn.click();
        });
    }

    async deleteCurrentEmailFromEmailAddressInputField() {
        await step('Delete email in the "Email Address" field', async () => {
            await this.emailAddressInputField.clear();
        });
    }

    async fillNewEmailIntoEmailAddressInputField(email) {
        await step('Fill "Email Address" field with new email', async () => {
            await this.emailAddressInputField.fill(email);
        });
    }

    async clickUpdateBtn() {
        await step('Click "Update" button', async () => {
            await this.updateBtn.click();
        });
    }

    async toggleCheckboxes(checkState) {
        await step(`${checkState ? 'Check' : 'Uncheck'} checkboxes`, async () => {
            const checkboxesCount = await this.checkBoxesList.count();
            for (let i = 0; i < checkboxesCount; i++) {
                const checkbox = this.checkBoxesList.nth(i);
                let isChecked, isUnChecked;

                if (checkState) {
                    isChecked = await checkbox.locator('.uiCheckbox--checked').count() > 0;
                    if (!isChecked) {
                        await checkbox.click();
                    }
                } else {
                    isUnChecked = await checkbox.locator('.uiCheckbox--unChecked').count() > 0;
                    if (!isUnChecked) {
                        await checkbox.click();
                    }
                }
            }
        });
    }

    async clickDateFormatDropdown() {
        await step('Click "Date Format" dropdown in the Preferences section', async () => {
            await this.dateFormatDropdown.click();
        });
    }
    
    async chooseDateFormat(format) {
        await step('Choose a date format', async () => {
            await this.dateFormat.getByText(format, { exact: true }).click();
        });
    }

  async uploadImage(image) {
    await step('Upload avatar image', async () => {
      await this.fileInput.setInputFiles(image);
    });
  }

  async getProfileAvatarLink() {
    return await step('Get profile avatar image link', async () => {
      return await this.avatarImage.getAttribute('src');
    });
  }
}

