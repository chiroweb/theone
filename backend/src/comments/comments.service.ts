import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '',
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') || '',
    );
  }

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const { data, error } = await this.supabase
      .from('comments')
      .insert({
        ...createCommentDto,
        author_id: userId,
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to create comment: ${error.message}`);
      throw error;
    }
    return data;
  }

  async findAllByPost(postId: string) {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*, author:author_id(email)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      this.logger.error(`Failed to fetch comments for post ${postId}: ${error.message}`);
      throw error;
    }
    return data;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string) {
    const { data, error } = await this.supabase
      .from('comments')
      .update(updateCommentDto)
      .eq('id', id)
      .eq('author_id', userId)
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to update comment ${id}: ${error.message}`);
      throw error;
    }
    return data;
  }

  async remove(id: string, userId: string) {
    const { error } = await this.supabase
      .from('comments')
      .delete()
      .eq('id', id)
      .eq('author_id', userId);

    if (error) {
      this.logger.error(`Failed to delete comment ${id}: ${error.message}`);
      throw error;
    }
    return { message: 'Comment deleted successfully' };
  }
}
