import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  showEdit() {
    const e = $('#showEdit');

    if (e.hasClass('hide')) {
      e.addClass('show');
      e.removeClass('hide');
    } else {
      e.addClass('hide');
      e.removeClass('show');
    }

  }
}
