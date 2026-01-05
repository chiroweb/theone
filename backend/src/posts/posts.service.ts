import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '',
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') || '',
    );
  }

  async create(createPostDto: CreatePostDto, userId: string) {
    const { data, error } = await this.supabase
      .from('posts')
      .insert({
        ...createPostDto,
        author_id: userId,
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to create post: ${error.message}`);
      throw error;
    }
    return data;
  }

  async findAll(page: number = 1, limit: number = 10, category?: string, sort: string = 'latest') {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = this.supabase
      .from('posts')
      .select('*, author:author_id(email)', { count: 'exact' });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (sort === 'popular') {
      query = query.order('views', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      this.logger.error(`Failed to fetch posts: ${error.message}`);
      throw error;
    }

    return { data, count };
  }

  async findOne(id: string) {
    // Increment views
    await this.supabase.rpc('increment_views', { post_id: id });

    const { data, error } = await this.supabase
      .from('posts')
      .select('*, author:author_id(email)')
      .eq('id', id)
      .single();

    if (error) {
      this.logger.error(`Failed to fetch post ${id}: ${error.message}`);
      throw error;
    }
    return data;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const { data, error } = await this.supabase
      .from('posts')
      .update(updatePostDto)
      .eq('id', id)
      .eq('author_id', userId) // Ensure ownership
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to update post ${id}: ${error.message}`);
      throw error;
    }
    return data;
  }

  async remove(id: string, userId: string) {
    const { error } = await this.supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('author_id', userId); // Ensure ownership

    if (error) {
      this.logger.error(`Failed to delete post ${id}: ${error.message}`);
      throw error;
    }
    return { message: 'Post deleted successfully' };
  }
}
