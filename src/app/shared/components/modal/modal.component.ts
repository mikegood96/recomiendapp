import {Component, Inject, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ListI} from '../../models/list.interface';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title = `Añadir nueva lista`;
  @Input() list: ListI;

  constructor(
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
  }

}
