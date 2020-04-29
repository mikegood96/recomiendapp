import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../shared/services/auth.service';
import {UserI} from '../../../shared/models/user.interface';

import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authSvc: AuthService, private route: Router) { }

  // Validación de formulario
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {}

  onLogin(form: UserI) {
    this.authSvc.loginByEmail(form)
      .then(res => {
        console.log('loggeado', res);
        this.route.navigate(['/']);
      })
      .catch(err => console.log('error', err));
  }

}
