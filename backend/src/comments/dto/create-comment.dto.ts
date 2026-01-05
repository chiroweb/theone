import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsUUID()
    post_id: string;

    @IsString()
    content: string;

    @IsUUID()
    @IsOptional()
    parent_id?: string;
}
