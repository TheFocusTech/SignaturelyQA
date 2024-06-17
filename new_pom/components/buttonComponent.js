export default class ButtonsComponent {
  constructor(page) {
      this.page = page;

      this.saveBtn = this.page.getByRole('button', {name: 'Save'});
  }
  
  async clickSaveBtn() {
    await this.saveBtn.click();
  }
}