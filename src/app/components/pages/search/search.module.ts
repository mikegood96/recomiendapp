import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from './filter.pipe';
import {ListModule} from '../../lists/list/list.module';
import {CategoryPipe} from './category.pipe';


@NgModule({
  declarations: [SearchComponent, FilterPipe, CategoryPipe],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ListModule
  ]
})
export class SearchModule { }
