import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {  MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  // paymentMethod: any;
  // paymentMethods: any = ['PhonePay', 'Credit Card', 'Cash'];
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  async removeAddress() {
    const alert = await this.alertCtrl.create({
      header: 'Payment Method',
      message: 'Choose payment option.',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'PhonePay',
          value: 'value1'
          
        },
      
     
        {
          name: 'radio1',
          type: 'radio',
          label: 'CreditCard',
          value: 'value1'
          
        },
        {
          name: 'radio1',
          type: 'radio',
          label: 'Cash',
          value: 'value1'
          
        }
      ],
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
               // showCloseButton: true,
                message: 'Payment successfully done.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
              this.navCtrl.navigateForward('/payment-confirm');
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
