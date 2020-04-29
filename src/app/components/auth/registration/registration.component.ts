import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authError: any;
  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
  }

  createUser(frm) {
    this.authSvc.createUser(frm.value);
  }

}
