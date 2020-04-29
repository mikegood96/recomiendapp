import { Injectable } from '@angular/core';
import { FileI } from '../models/file.interface';
import { UserI} from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {ListI} from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;
  private filePath: string;
  newUser: any;
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  private userUID: string;
  otherUserUID = '';
  private usersCollection: AngularFirestoreCollection<UserI>;

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage,
              private afs: AngularFirestore, private router: Router) {
    this.userData$ = afAuth.authState;
  }

  public getAllUsers(): Observable <UserI[]> {
    this.usersCollection = this.afs.collection<UserI>( 'Users');
    return this.usersCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as UserI;
            const uid = a.payload.doc.data().uid;
            return { uid, ...data };
          }))
      );
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  getUserUID() {
    if (this.getCurrentUser() != null) {
      this.userUID = this.afAuth.auth.currentUser.uid;
      console.log(this.userUID);
    }
    console.log(this.userUID);
    return this.userUID;
  }

  getUserState() {
    return this.afAuth.authState;
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile( {
            displayName: user.username
        });
        this.insertUserData(userCredential)
          .then( () => {
            this.router.navigate(['home']);
          } );
      }).catch( error => {
        this.eventAuthError.next(error);
    } );
  }

  insertUserData( userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`Users/${userCredential.user.uid}`).set({
      uid: userCredential.user.uid,
      email: this.newUser.email,
      username: this.newUser.username,
      role: 'normal user'
    });
  }

  loginByEmail(user: UserI) {
    const {email, password} = user;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  preSaveUser(user: UserI, image?: FileI): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: UserI, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          user.photoURL = urlImage;
          this.saveUserProfile(user);
        });
      } )
    ).subscribe();
  }

  private saveUserProfile(user: UserI) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    })
      .then( () => Swal.fire(
        '¡ Perfecto !',
        'Cambios guardados',
        'success'
      ))
      .catch( error => console.log('error'));
  }
}
