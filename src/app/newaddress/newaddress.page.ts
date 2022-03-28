import { Component  } from '@angular/core';
// import {FormControl, Validators} from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-newaddress',
  templateUrl: './newaddress.page.html',
  styleUrls: ['./newaddress.page.scss'],
})
export class NewaddressPage  {
  // email = new FormControl('', [Validators.required, Validators.email]);
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) { 
  }
  async saveAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Save Details',
     // message: 'Enter you email address to send a reset link password.',
      // inputs: [
      //   {
      //     name: 'email',
      //     type: 'email',
      //     placeholder: 'Email'
      //   }
      // ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
              //  showCloseButton: true,
                message: 'Address saved successfully .',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
              this.navCtrl.navigateForward('/payment');
            });
          }
        }
      ]
    });

    await alert.present();
  }
  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }
}
  // ngOnInit() {
  // }


