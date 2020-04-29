import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-container-app',
  templateUrl: './container-app.component.html',
  styleUrls: ['./container-app.component.scss']
})
export class ContainerAppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showMessage() {
    const currentRoute = this.router.url;
    return currentRoute === '/admin';
  }
}
