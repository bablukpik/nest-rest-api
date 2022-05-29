# NestJS Task Management Application - REST APIs

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
## The following table shows the overview of the REST APIs

```
| Methods  | Urls | Actions |
| ------------- | ------------- |
| POST | /api/tasks | Create a task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks?status=DONE&search=any string | Filter tasks by using status and either title or description |
| GET | /api/tasks/:id | Get a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

```