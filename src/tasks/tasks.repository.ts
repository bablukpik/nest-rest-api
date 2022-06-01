import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskEntity } from "./tasks.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask (createTaskDto: CreateTaskDto) {
    const { 
      title,
      description,
      status
    } = createTaskDto;
    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task_entity');

    if (status) {
      query.andWhere('task_entity.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task_entity.title) LIKE LOWER(:search) OR LOWER(task_entity.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
