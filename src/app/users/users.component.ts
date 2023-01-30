import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableHead } from '../ui/interfaces/tableHead';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  tableHeadArray: TableHead[] = [
    { name: 'First Name', field: 'firstname' },
    { name: 'Last Name', field: 'lastname' },
    { name: 'Email', field: 'email' },
    { name: 'Age', field: 'age' },
  ];
  isLoading = false;
  subscriptionDelete!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): any {
    this.getUsers();
    this.subscriptionDelete = this.userService.deleteUserClick.subscribe((id) =>
      this.onDelete(id)
    );
  }

  getUsers() {
    this.isLoading = true;
    this.userService.fetchUsers().subscribe((response) => {
      this.users = response;
      this.isLoading = false;
    });
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDelete.unsubscribe();
  }
}
