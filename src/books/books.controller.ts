import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/role.enum';




@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Post()
    @Auth([Rol.ADMIN])
    async createBook(@Body() newBook: CreateBookDto) {
        return await this.booksService.createBook(newBook);
    }

    @Get()
    //@Auth([Rol.ADMIN])
    async findAll() {
        return await this.booksService.findAll();
    }

    @Get(':filtered')
    async findBooksFiltered (
        @Query('author') author?: string,
        @Query('publicationDate') publicationDate?: string,
        @Query('genre') genre?: string
    ) {
        return await this.booksService.findBooksFiltered({ author, publicationDate, genre });
    }
}
