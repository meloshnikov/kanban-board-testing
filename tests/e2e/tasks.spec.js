import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const taskData = {
  title: "Task number 1",
  assigneeEmail: "emily@example.com",
  content: "Task number 1 description",
  status: "To Publish",
  labels: ["feature", "task"],
};

test.beforeEach(async ({ taskManager: { logInPage, menu } }) => {
  await logInPage.logIn();
  await menu.goToTasksTab();
});

test("each status should content at least 1 task", async ({ taskManager: { tasksTab } }) => {
  const statuses = await tasksTab.statuses.all();

  for (const status of statuses) {
    const tasksInStatus = await status.locator(tasksTab.tasks).count();
    await expect(tasksInStatus).toBeGreaterThanOrEqual(1);
  }
});

test("should create new tasks", async ({ taskManager: { menu, tasksTab } }) => {
  await tasksTab.createNewTask();

  await tasksTab.form.fillInAssignee(taskData.assigneeEmail);
  await tasksTab.form.fillInTitle(taskData.title);
  await tasksTab.form.fillInContent(taskData.content);
  await tasksTab.form.fillInStatus(taskData.status);
  await tasksTab.form.fillInLabel(taskData.labels);
  await tasksTab.form.saveItem();
  await menu.goToTasksTab();

  await expect(await tasksTab.getTaskDataByTitle(taskData.title)).toMatchObject(
    {
      title: taskData.title,
      assigneeEmail: taskData.assigneeEmail,
      status: taskData.status,
    }
  );
});

test("should not create task whithout data", async ({ taskManager: { tasksTab } }) => {
  await tasksTab.createNewTask();

  await expect(tasksTab.form.saveButton).toBeDisabled();
});

test("should edit task data", async ({ taskManager: { tasksTab } }) => {
  await tasksTab.editTaskByTitle("Task 2");
  await tasksTab.form.fillInTitle(taskData.title);
  await tasksTab.form.saveItem();

  const editedTask = await tasksTab.getTaskDataByTitle(taskData.title);

  await expect(editedTask.title).toEqual(taskData.title);
});

test("should be possible to delete tasks", async ({ taskManager: { tasksTab } }) => {
  const taskToDeleteTitle = "Task 2";

  await tasksTab.deleteTaskByTitle(taskToDeleteTitle);

  await expect(await tasksTab.findTaskByTitle(taskToDeleteTitle)).toHaveCount(0);
});

test("should be possible to drag tasks between statuses", async ({ taskManager: { menu, tasksTab } }) => {
  const additionalTaskData = {
    title: "Task number 10",
    assigneeEmail: "emily@example.com",
    content: "Task number 10 description",
    status: "Published",
    labels: ["feature", "task"],
  };
  await tasksTab.createDefaultTask(taskData);
  await menu.goToTasksTab();
  await tasksTab.createDefaultTask(additionalTaskData);
  await menu.goToTasksTab();

  await tasksTab.dragAndDropTask(taskData.title, additionalTaskData.status);
  const sourceTaskData = await tasksTab.getTaskDataByTitle(taskData.title);

  await expect(sourceTaskData.status).toEqual(additionalTaskData.status);
});

test.describe("should be filtered", () => {
  const statusData = {
    name: "Testing",
    slug: "Testing",
  };

  const labelData = {
    name: "test",
  };

  const userData = {
    email: "aria@winterfell.got",
    firstName: "Aria",
    lastName: "Stark",
  };

  const taskData = {
    status: statusData.name,
    assigneeEmail: userData.email,
    title: "Task number 100",
    labels: [labelData.name],
  };

  test.beforeEach(async ({ taskManager: {
    menu,
    tasksTab,
    usersTab,
    statusesTab,
    labelsTab
  } }) => {
    await menu.goToUsersTab();
    await usersTab.createDefaultUser(userData);
    await menu.goToStatusesTab();
    await statusesTab.createDefaultStatus(statusData);
    await menu.goToLabelsTab();
    await labelsTab.createDefaultLabel(labelData);
    await menu.goToTasksTab();
    await tasksTab.createDefaultTask(taskData);
    await menu.goToTasksTab();
  });

  test("by assignee", async ({ taskManager: { tasksTab } }) => {
    await tasksTab.filters.filterByAssignee(taskData.assigneeEmail);
    const tasksInStatus = await tasksTab.findTasksByStatus(taskData.status);

    await expect(tasksInStatus).toHaveCount(1);
    await expect(tasksInStatus).toContainText(taskData.title);
  });

  test("by status", async ({ taskManager: { tasksTab } }) => {
    await tasksTab.filters.filterByStatus(taskData.status);

    const tasksInStatus = await tasksTab.findTasksByStatus(taskData.status);

    await expect(tasksInStatus).toHaveCount(1);
    await expect(tasksInStatus).toContainText(taskData.title);
  });

  test("by label", async ({ taskManager: { tasksTab } }) => {
    await tasksTab.filters.filterByLabel(labelData.name);

    const tasksInStatus = await tasksTab.findTasksByStatus(taskData.status);

    await expect(tasksInStatus).toHaveCount(1);
    await expect(tasksInStatus).toContainText(taskData.title);
  });
});
