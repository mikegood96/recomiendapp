import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ListService} from '../list.service';
import {ListI} from '../../../shared/models/list.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  private image: any;
  private imageOriginal: any;

  @Input() list: ListI;

  constructor(private listSvc: ListService, public activeModal: NgbActiveModal) { }

  public editListForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titleList: new FormControl('', Validators.required),
    contentList: new FormControl('', Validators.required),
    tagsList: new FormControl('', Validators.required),
    imageList: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.image = this.list.imageList;
    this.imageOriginal = this.list.imageList;
    this.initValuesForm();
  }

  editList(list: ListI) {
    if (this.image === this.imageOriginal) {
      list.imageList = this.imageOriginal;
      this.listSvc.editListById(list);
      this.activeModal.close('Close click');
    } else {
      this.listSvc.editListById(list, this.image);
      this.activeModal.close('Close click');
    }
  }

  handleImage(event: any): void {
    this.image = event.target.file[0];
  }

  private initValuesForm(): void {
    this.editListForm.patchValue({
      id: this.list.id,
      titleList: this.list.titleList,
      contentList: this.list.contentList,
      tagsList: this.list.tagsList
    });
  }

}
