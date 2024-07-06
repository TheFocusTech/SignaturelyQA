import {step} from "allure-js-commons";

export default class DeleteModal {
    constructor(page) {
        this.page = page;
        this.yesDeleteBtn = this.page.getByRole('button', {name: 'Yes, Delete'});
    }
    
    async clickYesDeleteBtn() {
        await step('Click on the "Yes, Delete" button in the modal window', async () => {
            await this.yesDeleteBtn.waitFor( {state: 'visible'});
            await this.yesDeleteBtn.click();
        });
    };
};
