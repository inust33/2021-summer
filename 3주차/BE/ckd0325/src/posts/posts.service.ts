import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostsEntity } from './posts.entity';
import { PostsDTO } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private postsRepository: Repository<PostsEntity>,
  ){}

  async showAll() {
    return await this.postsRepository.find();
  }

  async create(data: PostsDTO) {
    const post = this.postsRepository.create(data);
    await this.postsRepository.save(data);
    return post;
  }

  async findByTitle(title: string) {
    return await this.postsRepository.findOne({
      where: {
        title: title,
      },
    });
  }

  async read(id: number) {
    return await this.postsRepository.findOne({where: {id: id}});
  }

  async update(id: number, data: Partial<PostsDTO>) {
    await this.postsRepository.update({id}, data);
    return await this.postsRepository.findOne({id});
  }

  async destroy(id: number){
    await this.postsRepository.delete({id});
    return {delete: true};
  }
}
