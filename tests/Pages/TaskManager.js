import Header from '../Components/Header';
import Menu from '../Components/Menu';
import BasePage from './BasePage';
import Users from './Users';
import LogIn from './LogIn';

export default class TaskManager extends BasePage {
  constructor(page) {
    super(page);
    this.logInPage = new LogIn(this.page);
    this.fillerMessage = this.page.getByText('Lorem ipsum sic dolor amet...');
    this.header = new Header(this.page);
    this.menu = new Menu(this.page);
    this.usersTab = new Users(this.page);
  }

  async logOut() {
    await this.header.profileButton.click();
    await this.page.getByRole('menuitem').filter({ hasText: 'Logout' }).click();
  }
};
