import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  id!: number;
  editMode = false;
  userForm!: FormGroup;
  userSubscribe!: Subscription;
  userEditSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.id = id;
      this.editMode = true;
    }
    this.initForm();
  }

  onSubmit() {
    const newUser = this.userForm.value;

    if (this.editMode) {
      const addUserId = { ...newUser, id: this.id };
      this.userService.editUser(addUserId).subscribe((response: any) => {
        this.router.navigate(['/users/', response.id]);
        this.editMode = false;
      });
    } else {
      this.userSubscribe = this.userService
        .addUser(newUser)
        .subscribe((response: any) => {
          this.router.navigate(['/users/', response.id]);
        });
    }
  }

  private initForm() {
    let firstname = '';
    let lastname = '';
    let email = '';
    let age = 0;

    // If we are in edit mode we prefill the fields
    if (this.editMode) {
      this.userEditSubscription = this.userService
        .getUser(this.id)
        .subscribe((response) => {
          this.userForm.patchValue(response);
        });
    }

    this.userForm = new FormGroup({
      firstname: new FormControl(firstname, Validators.required),
      lastname: new FormControl(lastname, Validators.required),
      email: new FormControl(email, [Validators.required, Validators.email]),
      age: new FormControl(age, [Validators.required, forbiddenUnderAge(18)]),
    });
  }

  isFieldValid(field: string) {
    return (
      !this.userForm.get(field)?.valid && this.userForm.get(field)?.touched
    );
  }

  isValidGroup(field: string) {
    return this.userForm.get(field)?.valid;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field),
    };
  }

  displayGroupCss(field: string) {
    return {
      'was-validated': this.isValidGroup(field),
    };
  }
}

export function forbiddenUnderAge(age: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value < age;
    return forbidden ? { age: { value: control.value } } : null;
  };
}
