<h2 align="center"> Kanban board testing project at Hexlet </h2>

<div align="center">
	<a href="https://github.com/meloshnikov/kanban-board-testing/actions">
		<img src="https://github.com/meloshnikov/kanban-board-testing/actions/workflows/hexlet-check.yml/badge.svg" />
	</a>
  <a href="https://github.com/meloshnikov/kanban-board-testing/actions">
		<img src="https://github.com/meloshnikov/kanban-board-testing/actions/workflows/playwright.yml/badge.svg" />
	</a>
  <a href="https://github.com/meloshnikov/kanban-board-testing/actions">
		<img src="https://github.com/meloshnikov/kanban-board-testing/actions/workflows/github-pages.yml/badge.svg" />
	</a>
</div>

Task Manager is a task management system that uses a flexible Kanban board to visualize workflow. 

E2E testing was performed using Playwright. The testing covers how the system provides CRUD to the following instances:

* Users (to whom a specific task can be assigned).
* Task statuses (e.g., 'Completed', 'In Progress', 'In Testing').
* Task labels (e.g., 'Feature', 'Bug').
* Tasks (represented as a Kanban board).

## Installation
>note: the current version of Kanban board was tested using Node.js v20.11.1
* Clone this repository.
* Install required dependencies:
```
make install
```

## How to run tests
* Run Kanban board:
```
make start
```
* Run tests:
```
make test
```
