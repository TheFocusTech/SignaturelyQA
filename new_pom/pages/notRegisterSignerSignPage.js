import SignerAgreeModal from '../modalWindows/signerAlmostDoneModal';
import ToastComponent from '../components/toastComponent';
import { step } from 'allure-js-commons';

export default class NotRegisterSignerSignPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.signInput = page.locator('.fieldDropDown');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });       
    }

    async clickSignInput() {
        await step('Put a signature.', async () => {
            this.signInput.click();
        });
    }

    async clickSubmitBtn() {
        await step('Click on "Submit" button.', async () => {
            this.submitBtn.click();
        });
    }
}
