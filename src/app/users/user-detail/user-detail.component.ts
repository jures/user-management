import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user!: User;
  subscriptionDelete!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.userService.getUser(id).subscribe((response) => {
      this.user = response;
    });

    this.subscriptionDelete = this.userService.deleteUserClick.subscribe((id) =>
      this.userService.deleteUser(id).subscribe(() => {
        this.router.navigate(['/users']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionDelete.unsubscribe();
  }
}
