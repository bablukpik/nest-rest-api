import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks.interface";

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: TaskStatus;
}
