import { InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../auth/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks.interface";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository');

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    query.where({ user });
    
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask (createTaskDto: CreateTaskDto, user: User) {
    const { 
      title,
      description,
      status
    } = createTaskDto;
    // const task = new Task();
    // task.title = title;
    // task.description = description;
    // task.status = status;
    // task.user = user;
    // await task.save();

    const task = this.create({
      title,
      description,
      status: status || TaskStatus.OPEN,
      user,
    });


    await this.save(task);
    return task;
  }
}
