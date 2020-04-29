import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private route: Router, public autSvc: AuthService) { }

  ngOnInit() {
  }

  goToHome() {
    this.route.navigate(['/home']);
  }

  goToSearch() {
    this.route.navigate(['/search']);
  }

  goToShare() {
    this.route.navigate(['/share']);
  }

}
