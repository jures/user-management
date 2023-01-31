import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableHead } from '../ui/interfaces/tableHead';
import { PagerService } from './pager.service';
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
  pager: any = {};
  pagedItems: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private pagerService: PagerService
  ) {}

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
      // initialize to page 1
      this.setPage(1);
    });
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.length, page);

    // get current page of items
    this.pagedItems = this.users.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnDestroy(): void {
    this.subscriptionDelete.unsubscribe();
  }
}
