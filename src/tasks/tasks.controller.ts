import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './tasks.entity';
import { TaskStatus } from './tasks.interface';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.taskService.getTasks(getTasksFilterDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask( @Body() createTaskDto: CreateTaskDto ): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put('/:id')
  async updteTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    return this.taskService.updateTask(id, title, description, status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
