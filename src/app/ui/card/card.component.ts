import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() user: User = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    age: 0,
  };

  constructor(private userService: UserService, private router: Router) {}

  onDelete(id: number) {
    this.userService.deleteUserClick.next(id);
  }

  onEdit(user: User) {
    this.router.navigate(['/users', user.id, 'edit']);
  }
}
