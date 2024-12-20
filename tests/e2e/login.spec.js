import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

test('should render logn form', async ({ taskManager: { logInPage } }) => {
  await expect(logInPage.userNameInput).toBeVisible();
  await expect(logInPage.passwordInput).toBeVisible();
  await expect(logInPage.signInButton).toBeVisible();
});

test('should login when username and password provided', async ({ taskManager }) => {
  await taskManager.logInPage.logIn();

  await expect(taskManager.fillerMessage).toBeVisible();
  await expect(taskManager.header.profileImage).toBeVisible();
  await expect(taskManager.header.profileButton).toHaveText('Jane Doe');
});

test('should not login when only username is provided', async ({ taskManager }) => {
  await taskManager.logInPage.tryToLogIn('username');

  await expect(taskManager.logInPage.errorMessage).toBeVisible();
  await expect(taskManager.fillerMessage).not.toBeVisible();
});

test('should not login when only password is provided', async ({ taskManager }) => {
  await taskManager.logInPage.tryToLogIn('password');

  await expect(taskManager.logInPage.errorMessage).toBeVisible();
  await expect(taskManager.fillerMessage).not.toBeVisible();
});

test('should not login when no username and password provided', async ({ taskManager }) => {
  await taskManager.logInPage.tryToLogIn();

  await expect(taskManager.logInPage.errorMessage).toBeVisible();
  await expect(taskManager.fillerMessage).not.toBeVisible();
});

test('should be possible to logout', async ({ taskManager }) => {
  await taskManager.logInPage.logIn();

  await taskManager.logOut();

  await expect(taskManager.logInPage.userNameInput).toBeVisible();
});
