import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ListService} from '../list.service';
import {Observable} from 'rxjs';
import {ListI} from '../../../shared/models/list.interface';
import {AuthService} from '../../../shared/services/auth.service';
@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss']
})
export class DetailsListComponent implements OnInit {
  userUID = '';
  public list$: Observable<ListI>;
  constructor(private route: ActivatedRoute, private listSvc: ListService, private authSvc: AuthService) { }

  ngOnInit() {
    if (this.authSvc.getCurrentUser() != null) {
      this.userUID = this.authSvc.getUserUID();
    }
    if (this.userUID != null) {
      const idList = this.route.snapshot.params.id;
      this.list$ = this.listSvc.getOneList(idList, this.userUID);
    }
  }
}
