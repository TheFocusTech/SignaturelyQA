export default class HeaderComponent {
    constructor(page) {
        this.page = page;

        this.userName = this.page.locator('.dropDownUser__trigger-name')
    }
    
}