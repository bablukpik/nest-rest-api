import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../tasks.interface';

export class TaskStatusValidationPipe implements PipeTransform {
  // readonly allowedStatuses = [
  //   TaskStatus.OPEN,
  //   TaskStatus.IN_PROGRESS,
  //   TaskStatus.DONE,
  // ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    // const idx = this.allowedStatuses.indexOf(status);
    // const idx = 
    // return idx !== -1;
    return Object.values(TaskStatus).includes(status);
  }
}