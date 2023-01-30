import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    component: UsersComponent,
    pathMatch: 'full',
  },
  { path: 'users/new', component: CreateUserComponent },
  {
    path: 'users/:id',
    component: UserDetailComponent,
  },
  {
    path: 'users/:id/edit',
    component: CreateUserComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
