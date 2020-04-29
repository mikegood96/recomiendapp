import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: firebase.User;

  constructor(public authSvc: AuthService) {
  }

  ngOnInit() {
    this.authSvc.getUserState().subscribe(user => {
      this.user = user;
    });
  }


  onLogOut(): void {
    this.authSvc.logOut();
  }

  showMenu() {
    const e = $('#showMenu');

    if (e.hasClass('hide')) {
      e.addClass('show');
      e.removeClass('hide');
    } else {
      e.addClass('hide');
      e.removeClass('show');
    }

  }


}
