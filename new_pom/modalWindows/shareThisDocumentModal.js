import { step } from 'allure-js-commons';

export default class ShareThisDocumentModal {
    constructor(page) {
        this.page = page;
        
        this.inputEmailField = this.page.getByPlaceholder('test@signaturely.com');
        this.shareDocumentBtn = this.page.getByRole('button', {name: 'Share Document'});
    }
    
    async clickInputEmailField(email) {
        await step('Fill email in the Add Viewers field.', async () => {
            await this.inputEmailField.fill(email);
        });
    }

    async clickShareDocumentBtn() {
        await step('Click the "Share Document" button', async () => {
            await this.shareDocumentBtn.click();
        });
    }
  };