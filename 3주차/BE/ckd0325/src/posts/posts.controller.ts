import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,   
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { PostsDTO } from './posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async showAllPosts() {
    const posts = await this.postsService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Posts fetched successfully',
      posts
    };
  }

  @Post()
  async createPosts(@Body() data: PostsDTO) {
    const post = await this.postsService.create(data);
    return{
      statusCode: HttpStatus.OK,
      message: 'Post created successfully',
      post
    }
  }

  @Get(':id')
  async readPost(@Param('id') id: number){
    const data = await this.postsService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Post fetched successfully',
      data,
    }
  }

  @Patch(':id')
    async uppdatePost(@Param('id') id: number, @Body() data: Partial<PostsDTO>) {
      await this.postsService.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Post updated successfully',
    };
  }

  @Delete(':id')
    async deletePost(@Param('id') id: number) {
      await this.postsService.destroy(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Post deleted successfully',
      };
    }
}
