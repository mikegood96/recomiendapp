import {Component, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import {FileI} from '../../../shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public image: FileI;
  public currentImage = 'https://picsum.photos/150/150';
  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.authSvc.userData$.subscribe( user => {
      this.initValuesForm(user);
    });
  }

  private initValuesForm(user: UserI): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    });
  }

  onSaveUser(user: UserI) {
    this.authSvc.preSaveUser(user, this.image);
  }

  handleImage(image: FileI): void {
    this.image = image;
}

}
