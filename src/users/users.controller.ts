import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getUsers(){
  //   return 'Hello';
  // }

  @Post()
  insertUser(
    @Body('name') name: string,
  ) {
    const userId = this.usersService.insertUser(name);
     return {
       id: userId,
     }
  }

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.usersService.getUser(userId);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body('name') name: string,
  ) {
    return this.usersService.updateUser(userId, name)
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }
}

