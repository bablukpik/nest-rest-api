import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env-${process.env.NODE_ENV}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
