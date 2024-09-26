import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      //entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule],
})
export class AppModule { }
