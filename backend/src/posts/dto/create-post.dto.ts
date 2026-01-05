import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    category: string;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsArray()
    @IsOptional()
    images?: string[];
}
