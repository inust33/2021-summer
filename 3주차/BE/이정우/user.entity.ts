import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length : 20})
  @MinLength(2)
  @MaxLength(20)
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  @Min(12)
  @Max(99)
  age: number;

  @Column({ length : 20})
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  nickname: string;

  static findByNames(name:string, nickname:string) {
    return this.createQueryBuilder("user")
        .where("user.name = :name",  { name })
        .andWhere("user.nickname = :nickname", { nickname })
        .getOne(); 
  }
}