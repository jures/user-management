import { User } from 'src/app/users/user.model';

export interface TableHead {
  name: string;
  field: keyof User;
}
