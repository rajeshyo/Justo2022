import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import swal from 'sweetalert2';
@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) { }
    async removeAddress() {
      const loader = await this.loadingCtrl.create({
        duration: 2000
      });
  
      loader.present();
      loader.onWillDismiss().then(async l => {
        const toast = await this.toastCtrl.create({
         // showCloseButton: true,
          cssClass: 'bg-profile',
          message: 'Address removed successfully',
          duration: 3000,
          position: 'bottom'
        });
  
        toast.present();
        this.navCtrl.navigateForward('/home');
      });
    }

  ngOnInit() {
    // swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Something went wrong!',
    //   footer: '<a href>Why do I have this issue?</a>'
    // })
  }

}
