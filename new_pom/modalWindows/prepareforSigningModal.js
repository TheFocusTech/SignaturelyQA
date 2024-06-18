export default class PrepareForSigningModal {
    constructor(page) {
        this.page = page;

         this.signBtn = this.page.getByRole('complementary').getByText('Sign');
         this.signatureElement = this.page.locator('.documentPage .react-pdf__Page__canvas').last();
         this.createBtn = this.page.getByRole('button', { name: 'Create' });
         this.backToTempatesBtn = this.page.getByRole('button', { name: 'Back to Templates' })

    }


    async clickSignBtn() {
        try {
            await this.signBtn.click();
        } finally {

        }
    }

    async performSignature(startX, startY) {
        const endX = 600;
        const endY = 400;

        try {
            await this.signatureElement.waitFor({ state: 'visible' });
            const box = await this.signatureElement.boundingBox();

            if (box) {
                await this.page.mouse.move(startX, startY);
                await this.page.mouse.down();
                await this.page.mouse.move(endX, endY);
                await this.page.mouse.up();
                await this.page.mouse.click(endX, endY);
            }
        } finally {

        }
    }

    async clickcreateBtn() {
        try {
            await this.createBtn.click();

        } finally {

        }
    }

    async clickbackToTempatesBtn() {
        try {
            await this.backToTempatesBtn.click();

        } finally {

        }
    }

}