import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
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
