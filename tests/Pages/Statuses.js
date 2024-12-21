import Table from '../Components/Table';
import Form from '../Components/Form';
import BasePage from './BasePage';

export default class Statuses extends BasePage {
  constructor(page) {
    super(page);
    this.statusesTable = new Table(this.page);
    this.editableFields = ['Name', 'Slug'];
    this.form = new Form(this.page, this.editableFields);
  }

  async createDefaultStatus({ name, slug }) {
    await this.statusesTable.createNewItem(this.editableFields);

    await this.form.fillInputByLabel('Name', name);
    await this.form.fillInputByLabel('Slug', slug);
    await this.form.saveButton.click();
  }
}
