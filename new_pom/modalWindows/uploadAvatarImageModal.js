import { step } from 'allure-js-commons';

export default class UploadAvatarImageModal {
  constructor(page) {
    this.page = page;

    this.saveBtn = this.page.getByRole('button', { name: 'Save' });
  }

  async clickSaveButton() {
    await step('Click "Save" button', async () => {
      await this.saveBtn.click();
    });
  }
}