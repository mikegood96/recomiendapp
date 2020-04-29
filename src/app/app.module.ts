import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewListComponent } from './components/lists/new-list/new-list.component';
import { NewListModule } from './components/lists/new-list/new-list.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

/* Firebase */
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';

import {ReactiveFormsModule} from '@angular/forms';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { Modal2Component } from './shared/components/modal2/modal2.component';
import { EditListComponent } from './components/lists/edit-list/edit-list.component';
import { EditListModule } from './components/lists/edit-list/edit-list.module';
import { TableComponent } from './shared/components/table/table.component';
import { DetailsListComponent } from './components/lists/details-list/details-list.component';
import { ListModule } from './components/lists/list/list.module';


@NgModule({
  declarations: [
    AppComponent,
    NewListComponent,
    NavbarComponent,
    FooterComponent,
    ContainerAppComponent,
    ModalComponent,
    EditListComponent,
    Modal2Component,
    DetailsListComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NewListModule,
    ReactiveFormsModule,
    EditListModule,
    NgbModule.forRoot(),
    ListModule
  ],
  entryComponents: [ModalComponent, FooterComponent, Modal2Component],
  providers: [NgbActiveModal, TableComponent, NgbModal,
    {provide: StorageBucket, useValue: 'gs://t1-recomiendapp.appspot.com'}
  ],
  exports: [
    NavbarComponent,
    ModalComponent,
    Modal2Component,
    NewListComponent,
    FooterComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
