export default class EditAndResendDocumentModal {
    constructor(page) {
        this.page = page;

        this.editAndResendTitle = this.page.getByText('Edit & Resend document');
        this.revertToDraftBtn = this.page.getByRole('button', { name: 'Revert to Draft' });

    }

    async getTitleText() {
        await test.step('Retrieve the text of the heading', async () => {
            const actualText = await this.editAndResendTitle.textContent();
            return actualText
        });
    }

    async clickRevertToDraftBtn() {
        await test.step('Click the "Revert to Draft" button', async () => {
            await this.revertToDraftBtn.waitFor({ state: 'visible' });
            await this.revertToDraftBtn.click();
        });
    }

}

