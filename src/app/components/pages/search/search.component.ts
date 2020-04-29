import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {ListService} from '../../lists/list.service';
import {Observable, Subscription} from 'rxjs';
import * as $ from 'jquery';
import {ListI} from '../../../shared/models/list.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filterList: any;
  categoryList: any;
  public lists$: Observable<ListI[]>;
  userUID = '';

  constructor(private authSvc: AuthService, private listSvc: ListService) {

  }

  ngOnInit() {
    if (this.authSvc.getCurrentUser()) {
      this.userUID = this.authSvc.getUserUID();
      console.log(this.userUID);
    }
    if (this.userUID) {
      this.listSvc.getAllLists(this.userUID).subscribe(lists => console.log('LISTS', lists));
      this.lists$ = this.listSvc.getAllLists(this.userUID);
    }
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
