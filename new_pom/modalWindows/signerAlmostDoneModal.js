import { step } from 'allure-js-commons';

export default class SignerAlmostDoneModal {
    constructor(page) {
        this.page = page;

        this.iAgreeBtn = page.getByRole('button', { name: 'I Agree' });
    }

    async clickIAgreeBtn() {
        await step('Click on "I Agree" button.', async () => {
            this.iAgreeBtn.click();
        });
    }
}
