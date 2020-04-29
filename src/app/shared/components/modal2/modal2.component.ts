import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ListI} from '../../models/list.interface';


@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss']
})
export class Modal2Component implements OnInit {

  @Input() title = `Editar Lista`;
  @Input() list: ListI;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

}
