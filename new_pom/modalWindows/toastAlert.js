export default class ToastAlert {
  constructor(page) {
    this.page = page;

    this.toast = this.page.getByText('Document successfully saved!');
  }

  async waitForToastVisible() {
    await this.toast.waitFor({ state: 'visible'});
  }
  
  async waitForToastHidden() {
    await this.toast.waitFor({ state: 'hidden' });
  }

}