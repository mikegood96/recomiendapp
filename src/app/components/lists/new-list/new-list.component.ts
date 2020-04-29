import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../list.service';
import {ListI} from '../../../shared/models/list.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  private image: any;

  constructor(private listSvc: ListService, public activeModal: NgbActiveModal) { }


  public newListForm = new FormGroup(({
    titleList: new FormControl('', Validators.required),
    contentList: new FormControl('', Validators.required),
    tagsList: new FormControl('', Validators.required),
    imageList: new FormControl('', Validators.required)
  }));

  ngOnInit() {
  }


  addNewList(data: ListI) {
    this.activeModal.close('Close click');
    this.listSvc.updateImg(data, this.image);
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
    console.log('image', this.image);
  }

}
