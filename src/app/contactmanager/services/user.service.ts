import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: BehaviorSubject<User[]>;
  private dataStore:{
    users:User[]
  }
  constructor(private http:HttpClient) { 
    this.dataStore = { users:[]};
    this._users = new BehaviorSubject<User[]>([]);

  }
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }
  userByID(id:number){
    return this.dataStore.users.find(x=>x.id==id);
  }
  loadAll(){
    const usersURL = "https://angular-material-api.azurewebsites.net/users";
    return this.http.get<User[]>(usersURL)
    .subscribe(data=>{
      console.log(data)
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users);
    },error=>{
      console.error("Failed to fetch users");
      
    })
  }
}
