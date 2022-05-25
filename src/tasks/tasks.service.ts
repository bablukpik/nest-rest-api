import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
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
}
