import { Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import { Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import { ListI } from '../../shared/models/list.interface';
import { FileI } from '../../shared/models/file.interface';
import Swal from 'sweetalert2';
import {AuthService} from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listsCollection: AngularFirestoreCollection<ListI>;
  private filePath: any;
  private downloadURL: Observable<string>;
  userUID = '';

  constructor(private afs: AngularFirestore, private authSvc: AuthService, private storage: AngularFireStorage) {
    this.userUID = this.authSvc.getUserUID();
    console.log(this.userUID);
  }

  // Obtenemos el objeto de la base de datos
  public getAllLists(userUID): Observable <ListI[]> {
    this.listsCollection = this.afs.collection<ListI>( `Users/${userUID}/lists`);
    return this.listsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ListI;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
      );
  }

  public getOneList(id: ListI, userUID): Observable<ListI> {
    return this.afs.doc<ListI>( `Users/${userUID}/lists/${id}`).valueChanges();
  }

  public deleteListById(list: ListI) {
    return this.listsCollection.doc(list.id).delete();
  }

  public editListById(list: ListI, newImage?: FileI) {
    if (newImage) {
      this.uploadImage(list, newImage);
    } else {
      return this.listsCollection.doc(list.id).update(list).then( () => Swal.fire(
        '¡Perfecto!',
        'Tu lista ha sido editada',
        'success'
      ));
    }
  }

  public updateImg(list: ListI, image: FileI): void {
    this.uploadImage(list, image);
  }

  public saveList(list: ListI) {
    const listObj = {
      titleList: list.titleList,
      contentList: list.contentList,
      imageList: this.downloadURL,
      fileRef: this.filePath,
      tagsList: list.tagsList
    };
    if (list.id) {
      return this.listsCollection.doc(list.id).update(listObj);
    } else {
      return this.listsCollection.add(listObj);
    }
  }

  public uploadImage(list: ListI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe( urlImage => {
        this.downloadURL = urlImage;
        this.saveList(list);
      });
    })).subscribe();
  }
}
