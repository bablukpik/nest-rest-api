import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query('search') search: string,
    @Query('status') status: TaskStatus,
  ): Task[] {
    if (search || status) {
      return this.taskService.getTasksWithFiltes(search, status);
    }
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.createTask(title, description, status);
  }

  @Put('/:id')
  updteTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTask(id, title, description, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
