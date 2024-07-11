import { step } from 'allure-js-commons';
import ToastComponent from '../../components/toastComponent';

export default class TeamsAcceptInvitePage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.backToMainPageBtn = this.page.getByRole('button', { name: 'Back to main page' });
    }

    async clickBackToMainPageButton() {
        await step('Click on "Back to main page" button', async () => {
            await this.backToMainPageBtn.click();
        });
    }
}
