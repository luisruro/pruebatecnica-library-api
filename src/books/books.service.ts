import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) { }

    async createBook(book: CreateBookDto) {
        const bookFound = await this.bookRepository.findOne({
            where: {
                title: book.title,
                author: book.author,
                publicationDate: book.publicationDate,
                genre: book.genre
            }
        })

        if (bookFound) {

            throw new HttpException(`Book already exists: ${book.title}`, HttpStatus.CONFLICT);
        }

        const newBook = this.bookRepository.create(book);
        return this.bookRepository.save(newBook);
    }
}
