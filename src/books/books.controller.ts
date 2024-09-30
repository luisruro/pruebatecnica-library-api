import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/role.enum';


@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Post()
    @Auth([Rol.ADMIN])
    createBook(@Body() newBook: CreateBookDto) {
        return this.booksService.createBook(newBook);
    }
}
