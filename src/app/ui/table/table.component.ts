import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { TableHead } from '../interfaces/tableHead';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableHead: TableHead[] = [];
  @Input() users: User[] = [];

  constructor(private router: Router, private userService: UserService) {}

  rowClick(id: number) {
    this.router.navigate(['/users', id]);
  }

  onDelete(e: Event, id: number) {
    e.stopPropagation();
    this.userService.deleteUserClick.next(id);
  }

  onEdit(e: Event, user: User) {
    e.stopPropagation();
    this.router.navigate(['/users/', user.id, 'edit']);
  }
}
