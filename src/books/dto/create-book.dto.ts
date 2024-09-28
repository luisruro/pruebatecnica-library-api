import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {

    @IsString()
    @IsNotEmpty({message: 'Title is required and must be a string'})
    title: string;

    @IsString()
    @IsNotEmpty({message: 'Author is required and must be a string'})
    author: string;

    @IsDateString({}, { message: 'publicationDate must be a valid date string (e.g., YYYY-MM-DD)' })
    @IsNotEmpty({message: 'Publication Date is required'})
    publicationDate: string;

    @IsString()
    @IsNotEmpty({message: 'Genre is required and must be a string'})
    genre: string;
}