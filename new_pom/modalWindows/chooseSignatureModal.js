export default class ChooseSignatureModal {
    constructor(page) {
        this.page = page;

        this.checkboxAgree = this.page.locator('div').getByText('I agree to sign electronically pursuant to the ');
        this.signNowBtn = this.page.getByRole('button', {name: 'Sign Now'});
      }

      async clickCheckboxAgree() {
        await this.checkboxAgree.waitFor({state: 'visible'});
        await this.checkboxAgree.click();
    }

    async clickSignNowBtn() {
        await this.signNowBtn.click();
    }

}