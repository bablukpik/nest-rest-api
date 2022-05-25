import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(title: string, description: string, status: TaskStatus): Task {
    const task = {
      id: uuid(),
      title,
      description,
      status,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
  ): Task {
    const indexOfObject = this.tasks.findIndex((task) => task.id === id);
    if (title) {
      this.tasks[indexOfObject].title = title;
    }
    if (description) {
      this.tasks[indexOfObject].description = description;
    }
    if (status) {
      this.tasks[indexOfObject].status = status;
    }
    return this.tasks[indexOfObject];
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
