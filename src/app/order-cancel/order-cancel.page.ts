import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.page.html',
  styleUrls: ['./order-cancel.page.scss'],
})
export class OrderCancelPage implements OnInit {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  async removeAddress() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        //showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Cancel order successfully',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/home');
    });
  }

}
