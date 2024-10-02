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

    async findAll(): Promise<Book[]> {
        const bookFound = await this.bookRepository.find();

        if (!bookFound) {
            throw new HttpException('No books found', HttpStatus.NOT_FOUND);
        }

        return bookFound;
    }

    //Method to find a book either by date, author or genre
    //I can create a DTO for this method and handling errors
    async findBooksFiltered(filters: { author?: string, publicationDate?: string, genre?: string }) {

        const query = this.bookRepository.createQueryBuilder('book'); //it refers entity Book and 'book' is the alias

        if (filters.author) {
            query.andWhere('book.author = :author', {author: filters.author});//:author Se remplaza dinámicamente por el valor que le pasamos en el segundo argumento { author: filters.author }
            //query.where('book.author = :author', { author: filters.author });
        }

        if (filters.genre) {
            query.andWhere('book.genre = :genre', {genre: filters.genre});
        }

        if (filters.publicationDate) {
            query.andWhere('book.publicationDate = :publicationDate', {publicationDate: filters.publicationDate});
        }

        return await query.getMany();
     }
}
