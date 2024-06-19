import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";
import NewCreateAPIKeyModal from "../../modalWindows/createAPIKeyModal";

export default class NewSettingsAPIPage {
    constructor(page) {
        this.page = page;

        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);

        this.createAPIKeyModal =  new NewCreateAPIKeyModal(this.page)

        this.createAPIKeyButtonAtRight = this.page.locator('.team__header-container').getByRole('button', {name: 'Create API key'});
        this.billingDetailsField = this.page.getByPlaceholder('Enter billing details here');
        this.billingDetailsTextField = this.page.locator('.billing__details > form textarea');
    }

    async clickCreateAPIKeyButtonAtRight() {
        await this.createAPIKeyButtonAtRight().click();
    }

    async fillBillingDetailsField(text) {
        await this.billingDetailsField().waitFor({state: 'visible'});
        await this.billingDetailsField().fill(text);
    }

}