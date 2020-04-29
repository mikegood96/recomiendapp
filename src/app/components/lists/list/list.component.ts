import {Component, Input, OnInit} from '@angular/core';

import {ListService} from '../list.service';
import {ListI} from '../../../shared/models/list.interface';
import * as firebase from 'firebase';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: ListI;
  constructor( public authSvc: AuthService) { }

  ngOnInit() {
  }

}
