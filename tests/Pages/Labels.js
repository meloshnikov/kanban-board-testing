import Table from '../Components/Table';
import Form from '../Components/Form';
import BasePage from './BasePage';

export default class Labels extends BasePage {
  constructor(page) {
    super(page);
    this.labelsTable = new Table(page);
    this.editableFields = ['Name'];
    this.form = new Form(this.page, this.editableFields);
  }

  async createDefaultLabel({ name }) {
    await this.labelsTable.createNewItem(this.editableFields);

    await this.form.fillInputByLabel('Name', name);
    await  this.form.saveItem();
  }
}
