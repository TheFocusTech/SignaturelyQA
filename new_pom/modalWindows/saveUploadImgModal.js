import {step} from "allure-js-commons";

export default class SaveUploadImageModal {
    constructor(page) {
        this.page = page;
        this.saveButton = this.page.getByRole('button', {name: 'Save'});
    }
    
    async clickSaveButton() {
        await step('Click the "Save" button on the modal window', async () => {
            await this.saveButton.click();
        });
    };
};