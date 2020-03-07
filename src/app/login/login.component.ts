import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { first } from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {FormFieldService} from '../services/form-field.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private alertService: AlertService,
      private userService: UserService,
      private formFieldService: FormFieldService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.formFieldService.fieldFocusInputElement();
  }

  onSubmit(loginForm: NgForm) {
    this.userService.userLogin(loginForm.value.email, loginForm.value.password)
        .pipe(first())
        .subscribe(
            data => {
              const redirect = this.userService.redirectUrl ? this.userService.redirectUrl : '/home';
              this.router.navigate([redirect]);
            },
            error => {
              this.alertService.error('les identifiants sont incorrect ');
            });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
