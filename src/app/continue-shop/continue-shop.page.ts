import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-continue-shop',
  templateUrl: './continue-shop.page.html',
  styleUrls: ['./continue-shop.page.scss'],
})
export class ContinueShopPage implements OnInit {
  images = ['j.png','j.png','j.png'];
  show = false;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  goToEditProfile() {
    this.navCtrl.navigateForward('/cart');
  }
 
}
