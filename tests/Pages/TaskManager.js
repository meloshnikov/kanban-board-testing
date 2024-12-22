import Header from '../Components/Header';
import Menu from '../Components/Menu';
import BasePage from './BasePage';
import Statuses from './Statuses';
import Labels from './Labels';
import Users from './Users';
import Tasks from './Tasks';
import LogIn from './LogIn';

export default class TaskManager extends BasePage {
  constructor(page) {
    super(page);
    this.logInPage = new LogIn(this.page);
    this.fillerMessage = this.page.getByText('Lorem ipsum sic dolor amet...');
    this.header = new Header(this.page);
    this.menu = new Menu(this.page);
    this.usersTab = new Users(this.page);
    this.labelsTab = new Labels(this.page);
    this.statusesTab = new Statuses(this.page);
    this.tasksTab = new Tasks(this.page);
  }

  async logOut() {
    await this.header.profileButton.click();
    await this.page.getByRole('menuitem').filter({ hasText: 'Logout' }).click();
  }
};
