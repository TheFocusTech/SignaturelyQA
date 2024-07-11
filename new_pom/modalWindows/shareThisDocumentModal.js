import { step } from 'allure-js-commons';

export default class ShareThisDocumentModal {
    constructor(page) {
        this.page = page;
        
        this.inputEmailField = this.page.getByPlaceholder('test@signaturely.com');
        this.shareDocumentBtn = this.page.getByRole('button', {name: 'Share Document'});
    }
    
    async clickInputEmailField(email) {
        await step('Fill in email in the" Add Viewers" input field.', async () => {
            await this.inputEmailField.fill(email);
        });
    }

    async clickShareDocumentBtn() {
        await step('Click on "Share Document" button', async () => {
            await this.shareDocumentBtn.click();
        });
    }
  };