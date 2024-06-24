export default class EditAndResendDocumentModal {
    constructor(page) {
        this.page = page;

        this.editAndResendTitle = this.page.getByText('Edit & Resend document');
        this.revertToDraftBtn = this.page.getByRole('button', { name: 'Revert to Draft' });

    }

    async getTitleText() {
        const actualText = await this.editAndResendTitle.textContent();
        return actualText
    }

    async clickRevertToDraftBtn() {
        await this.revertToDraftBtn.waitFor();
        await this.revertToDraftBtn.click();
    }

}