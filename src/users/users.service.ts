import { User } from './users.model';
import { Controller, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
//injectableとは
@Injectable()
export class UsersService {
  private users: User[] = [];

  //新規ユーザー作成
  insertUser(name: string){
    const id = uuidv4();
    const newUser = new User(id, name);
    this.users.push(newUser);

    return id;
  }

  //全ユーザーを取得する
  getUsers() {
    return [...this.users];
  }

  //指定ユーザーを取得
  getUser(id: string) {
    return this.getUserById(id)[0];
  }

  updateUser(
    //引数の型
    id: string,
    name: string,
  ){
    const [targetUser, index] = this.getUserById(id);
    const newUserParam = { ...targetUser, name}; //targetUserオブジェクトの
    const newUser = new User(id, newUserParam.name);
    this.users[index] = newUser;
    return newUser;
  }

  deleteUser(id: string) {
    const [_, index] = this.getUserById(id);
    this.users.splice(index, 1);
  }

  private getUserById(id: string): [User, number] {
    //indexを取得
    const index = this.users.findIndex((u) => u.id == id);
    return [this.users[index], index]
  }
}