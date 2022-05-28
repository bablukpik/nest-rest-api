# NestJS Task Management Application - APIs

This is a simple NestJS task management application to perform CRUD operations.

## Installation

```bash
$ npm install
```

## Running the app

```bash
## development
$ npm run start

## watch mode
$ npm run start:dev

```
## The following table shows the overview of the Rest APIs

```
| Methods  | Urls | Actions |
| ------------- | ------------- |
| POST | /api/tasks | Create a task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks?status=DONE&search=any string | Get specific tasks by searching |
| GET | /api/tasks/:id | Get a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

```