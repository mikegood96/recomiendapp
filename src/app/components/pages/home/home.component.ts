import { Component, OnInit } from '@angular/core';
import {ListService} from '../../lists/list.service';
import {ListI} from '../../../shared/models/list.interface';
import {Observable} from 'rxjs';
import {AuthService} from '../../../shared/services/auth.service';
import {UserI} from '../../../shared/models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public lists$: Observable<ListI[]>;
  public users$: Observable<UserI[]>;
  userUID = '';
  otherUsersUID = [];
  private lists2$: Observable<ListI[]>;

  constructor(private listSvc: ListService, private authSvc: AuthService) {
  }

  ngOnInit() {
    if (this.authSvc.getCurrentUser() != null) {
      this.userUID = this.authSvc.getUserUID();
      console.log(this.userUID);
    }
    this.lists$ = this.getListsByUID(this.userUID);
    this.getAllUids(this.userUID);
  }

  getListsByUID(userUID) {
    if (userUID) {
      return this.listSvc.getAllLists(userUID);
    }
  }

  getAllUids(userUID): any {
    this.authSvc.getAllUsers().subscribe(users => console.log('USERS', users));
    this.users$ = this.authSvc.getAllUsers();

    this.users$.forEach(users => {
      users.forEach((user, k) => {
          this.otherUsersUID[k] = user.uid;
          this.otherUsersUID.forEach(uid => {
            if (userUID !== uid) {
              this.lists2$ = this.getListsByUID(uid);
              this.lists2$.subscribe(list => console.log(list));
            }
          });
      });
    });
  }

}
