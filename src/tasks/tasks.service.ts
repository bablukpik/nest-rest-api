import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.interface';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}
  
  async getTasks (filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user }});
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTask(
    id: number,
    title: string,
    description: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    
    const result = await this.taskRepository.save(task);

    return result;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({id, user});
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);      
    }
  }
}
