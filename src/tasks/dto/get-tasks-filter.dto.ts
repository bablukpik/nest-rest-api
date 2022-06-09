import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks.interface";

export class GetTasksFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  // @IsIn(Object.values(TaskStatus))
  @IsEnum(TaskStatus)
  status: TaskStatus;
}