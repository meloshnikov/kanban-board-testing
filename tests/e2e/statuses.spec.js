import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const statusData = {
  name: "In progress",
  slug: "in_progress",
};

test.beforeEach(async ({ taskManager: { logInPage, menu } }) => {
  await logInPage.logIn();
  await menu.goToStatusesTab();
});

test("should content at least 1 task status", async ({ taskManager: { statusesTab } }) => {
  await expect(statusesTab.statusesTable.table).toBeTruthy();
  await expect
    .poll(async () => statusesTab.statusesTable.getItemsNumber())
    .toBeGreaterThan(0);
});

test('all statuses on the page should have "Name" and "Slug"', async ({ taskManager: { statusesTab } }) => {
  const statusesData = await statusesTab.statusesTable.getTableData();

  statusesData.forEach((status) => {
    expect(status.Name).toBeTruthy();
    expect(status.Slug).toBeTruthy();
  });
});

test("should be possible to delete statuses from the table", async ({ taskManager: { statusesTab } }) => {
  const statusesBefore = await statusesTab.statusesTable.getItemsNumber();
  const statusesToDeleteCount = 2;

  const selectedStatusesIds = await statusesTab.statusesTable.selectItemsOnPage(statusesToDeleteCount);
  const selectedStatusesCount = await statusesTab.statusesTable.getSelectedItemsNumber();
  await expect(selectedStatusesCount).toBe(statusesToDeleteCount);
  await statusesTab.statusesTable.deletSelectedItems();
  const statusesAfter = await statusesTab.statusesTable.getItemsNumber();

  for (const id of selectedStatusesIds) {
    await expect(await statusesTab.statusesTable.findItemById(id)).toBe( "not found");
  }
  await expect(statusesAfter).toBe(statusesBefore - statusesToDeleteCount);
});

test("should be possible to delete all statuses from the table", async ({ taskManager: { statusesTab } }) => {
  const statusesCount = await statusesTab.statusesTable.getItemsNumber();

  await statusesTab.statusesTable.selectAllItems();
  const selectedStatusesCount = await statusesTab.statusesTable.getSelectedItemsNumber();
  await expect(selectedStatusesCount).toBe(statusesCount);
  await statusesTab.statusesTable.deletSelectedItems();

  await expect(statusesTab.statusesTable.table).not.toBeVisible();
});

test("should create new statuses", async ({ taskManager: { menu, statusesTab } }) => {
  const statusesBefore = await statusesTab.statusesTable.getItemsNumber();
  await statusesTab.statusesTable.createNewItem();

  await statusesTab.form.fillInputByLabel("Name", statusData.name);
  await statusesTab.form.fillInputByLabel("Slug", statusData.slug);
  const newStatusId = await statusesTab.form.saveItem();
  await menu.goToStatusesTab();
  const statusesAfter = await statusesTab.statusesTable.getItemsNumber();
  const newstatusData = await statusesTab.statusesTable.getItemDataById(newStatusId);

  expect(newstatusData).toMatchObject({ Name: statusData.name });
  expect(newstatusData).toMatchObject({ Slug: statusData.slug });
  await expect(statusesAfter).toBe(statusesBefore + 1);
});

test("should not create status whithout data", async ({ taskManager: { statusesTab } }) => {
  await statusesTab.statusesTable.createNewItem();

  await expect(statusesTab.form.saveButton).toBeDisabled();
});

test("should edit status data", async ({ taskManager: { statusesTab } }) => {
  await statusesTab.statusesTable.editItemById('1');

  await statusesTab.form.fillInputByLabel("Name", statusData.name);
  await statusesTab.form.saveItem();
  const editedStatus = await statusesTab.statusesTable.getItemDataById("1");

  await expect(editedStatus.Name).toEqual(statusData.name);
});
