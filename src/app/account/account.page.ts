import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { CartService } from '../cart.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  
  userdata:any;

  constructor(private authService: AuthService, public cartService:CartService) { }

  ngOnInit() {
    const loginData = JSON.parse(localStorage.getItem('logindata'));
    this.userdata=loginData
    return this.userdata
  }

  /* logout() {
    this.authService.logout();

  }; */

}
