class EditPage {

    constructor(page) {
        this.page = page;
    }

    locators = {
        
        getPrepareForSigningTitle: () => this.page.getByText('Prepare for Signing'),
        // getEditAndResendButton: () => this.page.getByRole('button', {name: 'Edit & Resend'}),
        // getModalForm: () => this.page.locator('.confirmModal__content'),
        // getRevertToDraftButton: () => this.page.getByRole('button', {name: 'Revert to Draft'}), 
        
    }

    async hoverPrepareForSigningTitle (){
        await this.locators.getPrepareForSigningTitle().hover()
        return this;
    }

    // async clickEditAndResendButton() {
    //     await this.locators.getEditAndResendButton().click();

    //     return this;
    // }

    // async clickRevertToDraftButton() {
    //     await this.locators.getRevertToDraftButton().click();

    //     return this;
    // }

    
}
export default EditPage;