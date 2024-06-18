export default class EditAndResendDocumentModal {
  constructor(page) {
      this.page = page;

      this.editAndResendTitle = this.page.getByText('Edit & Resend document');
  }

}