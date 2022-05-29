import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters({ search, status }: GetTasksFilterDto): Task[] {
    let tasks = this.getTasks();
    // And search 
    if (search) {
      tasks = tasks?.filter((task) => {
        return task.description.includes(search) 
          || task.title.includes(search);
      });
    }
    if (status) {
      tasks = tasks?.filter((task) => {
        return task.status === status;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  createTask({ title, description, status }: CreateTaskDto): Task {
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
    const task = this.getTaskById(id);
    
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    
    return task;
  }

  deleteTask(id: string) {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
