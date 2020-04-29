import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import {TableComponent} from '../../../shared/components/table/table.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListComponent],
  exports: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ReactiveFormsModule
  ]
})
export class ListModule { }
