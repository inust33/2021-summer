import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query} from '@nestjs/common';
import { concatWith } from 'rxjs';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService : UserService ){}
  @Get()
  findAll(){
    return this.userService.findAll();
  }
  @Get('/search')
  async fineOne(@Query('name') name:string, @Query('nickname') nickname:string){
    const foundUser = await User.findByNames(name,nickname);
    return foundUser;
  }
  @Post("/create")
  create(@Body() user:User){
    return this.userService.createUser(user);
  }
  @Patch(':id')
  async editUser(@Body() user:User, @Param('id') userId:string):Promise<User>{
    console.log(typeof +userId);
    const EditedUser = await this.userService.editUser(+userId, user)
    return EditedUser;
  }
  @Delete(":id")
  remove(@Param('id') userId:number){
    this.userService.remove(+userId);
  }  
}
