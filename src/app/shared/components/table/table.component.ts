import { Component, OnInit } from '@angular/core';
import {ListService} from '../../../components/lists/list.service';
import {Observable, Subscription} from 'rxjs';
import {ListI} from '../../models/list.interface';
// importamos sweet alert para las alertas
import Swal from 'sweetalert2';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import {Modal2Component} from '../modal2/modal2.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public lists$: Observable<ListI[]>;

  headElements = ['Lista', 'tags', 'Editar'];
  userUID = '';

  constructor(private listSvc: ListService, private modalService: NgbModal, private authSvc: AuthService) {
  }


  ngOnInit() {
    if (this.authSvc.getCurrentUser() != null) {
      this.userUID = this.authSvc.getUserUID();
      console.log(this.userUID);
    }
    if (this.userUID) {
      this.listSvc.getAllLists(this.userUID).subscribe(lists => console.log('LISTS', lists));
      this.lists$ = this.listSvc.getAllLists(this.userUID);
    }
  }

  onDeleteList(list: ListI) {
    console.log('delete', list);
    Swal.fire({
      title: '¿Estas seguro de que quieres eliminar?',
      text: `Esta acción no se puede revertir !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009035',
      cancelButtonColor: '#790101',
      confirmButtonText: 'Sí, Eliminalo !'
    }).then(result => {
      if (result.value) {
        this.listSvc.deleteListById(list).then( () => {
          Swal.fire('Eliminado!', 'Tu lista ha sido eliminada', 'success');
        }).catch( (error) => {
          Swal.fire('Error!', 'Ha ocurrido un error durante la eliminación', 'error');
        });
      }
    });
  }

  onEditList(list: ListI): void {
    this.openDialog2(list);
  }

  onNewList(): void {
    this.openDialog();
  }

  openDialog(list?: ListI): void {
    const dialogRef = this.modalService.open(ModalComponent);
  }
  openDialog2(list?: ListI): void {
    const dialogRef = this.modalService.open(Modal2Component);
    dialogRef.componentInstance.list = list;
  }

}
