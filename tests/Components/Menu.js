import BasePage from "../Pages/BasePage";

export default class Menu extends BasePage {
  constructor(page) {
    super(page);
    this.openButton = this.page.getByLabel('Open menu');
    this.tasksTab = this.page.getByRole('menuitem').filter({ hasText: 'Tasks' });
    this.usersTab = this.page.getByRole('menuitem').filter({ hasText: 'Users' });
    this.labelsTab = this.page.getByRole('menuitem').filter({ hasText: 'Labels' });
    this.statusesTab = this.page.getByRole('menuitem').filter({ hasText: 'Task statuses' });
  }

  async goToUsersTab() {
    await this.usersTab.click();
  }

  async goToLabelsTab() {
    await this.labelsTab.click();
  }

  async goToStatusesTab() {
    await this.statusesTab.click();
  }

  async goToTasksTab() {
    await this.tasksTab.click();
  }
};
