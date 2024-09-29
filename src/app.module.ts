import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configuration from './common/config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      // host: configService.get('POSTGRES_HOST'),
      // port: configService.get('POSTGRES_PORT'),
      // username: configService.get('POSTGRES_USER'),
      // password: configService.get('POSTGRES_PASSWORD'),
      // database: configService.get('POSTGRES_DB'),
      url: configService.get('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
    }),
  }),
    BooksModule,
    UsersModule],
})
export class AppModule { }
