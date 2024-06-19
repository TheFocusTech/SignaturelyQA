export default class FormsPage {
    constructor(page) {
        this.page = page;

        this.createFormBtn = this.page.getByRole('button', { name: 'Create Form' });
    }
}