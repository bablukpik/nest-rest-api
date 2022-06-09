import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
      
    const isProduction = configService.get('NODE_ENV') === 'prod';

    return {
      ssl: isProduction,
      extra: {
        ssl: isProduction ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      synchronize: isProduction ? false : true,
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      autoLoadEntities: true,
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    };
  },
}