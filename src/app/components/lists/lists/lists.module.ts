import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import {TableComponent} from '../../../shared/components/table/table.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListsComponent, TableComponent],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ListsModule { }
