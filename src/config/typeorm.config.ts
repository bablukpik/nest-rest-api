import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'me',
  password: 'me',
  database: 'mydb',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // not recommended for production
};
