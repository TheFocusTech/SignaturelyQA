import { step } from "allure-js-commons";

export default class DeleteFolderModal {
    constructor(page) {
        this.page = page;

        this.yesDeleteBtn = this.page.getByRole('button', { name: 'Yes, Delete' })
    }

    async clickYesDeleteBtn() {
        await step('Click "Yes, Delete" button on the modal window', async () => {
            await this.yesDeleteBtn.click();
        });
    }
}
