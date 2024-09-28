import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }
    
    @Post()
    createBook(@Body() newBook: CreateBookDto) {
        return this.booksService.createBook(newBook);
    }
}
