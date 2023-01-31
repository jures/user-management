import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

const API_PATH = 'http://localhost:3000/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  deleteUserClick = new Subject<number>();

  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http.get<User[]>(`${API_PATH}`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${API_PATH}/` + id);
  }

  deleteUser(id: number) {
    return this.http.delete(`${API_PATH}/` + id);
  }

  addUser(user: User) {
    return this.http.post(`${API_PATH}`, user);
  }

  editUser(user: User) {
    return this.http.put(`${API_PATH}/` + user.id, user);
  }
}
