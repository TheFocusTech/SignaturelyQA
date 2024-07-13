import TableComponent from '../../components/tableComponent';

export default class ApiTemplatesPage {
    constructor(page) {
        this.page = page;
        this.table = new TableComponent(this.page);
    }
}
