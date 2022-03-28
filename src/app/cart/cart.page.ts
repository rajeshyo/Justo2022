
import { Component, ViewChild,OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { ToastService } from '../services/toast.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

 loaddata = 0;
 discount = 0;
  user:any ={}
  finaldt:any;
  datareceive:String="";
  final:any;
  data: any;
  deals1=[]
  topdata1=[]
  topdata=[]
  cart=[]
  addtocart1=[]
  Integer:any;
  total: any;
  subtotal: any;
  totalprice=[];
  totalDiscont =0;
  totalFinal =0;
 
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public router:Router,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activatedRouter:ActivatedRoute,
    private http: HttpClient,
    private toastService: ToastService, 
    public cartService: CartService

  ) {

  }
  ionViewWillEnter(){
    this.addtocart();

  }

  ngOnInit() {
   

  }
 
  search(){
    this.navCtrl.navigateRoot('/search');
  }
  productdetails(id){
    this.router.navigate(['shirtdetail'],{queryParams:{id:id}})
    console.log("router id",id)
  }

 
  wishlistbtn(){
    this.navCtrl.navigateRoot('/wishlist');
  }
  wishlist(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addtowishlist');
    formdata.append('_session',session);
    formdata.append('record',id);
    formdata.append('module',"Products");
    formdata.append('value',"1");

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
    if(this.data.success == true) {  
      this.cartService.getCartItemCount();
          this.removeaddtocart(id);

          this.navCtrl.navigateRoot('/wishlist');
    }else{
      this.toastService.presentToast(this.data.error.message);
      
    }

    })
    .catch(console.log);

  }
 async addtocart() {

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
  
    loader.present();
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    // const foo = this.Integer.parseInt(userid);
    // let y = +userid; 
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','getCartProducts');
    formdata.append('_session',session);
    // formdata.append('productId',id);
    formdata.append('userId',userid);
    // formdata.append('qty',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();
      this.data = response;
      this.loaddata =1;

      if(this.data.success ==true) {
        this.cart =this.data.result.products;
        localStorage.setItem('cartdata', JSON.stringify(this.data.result.products));
      this.totalDiscont =this.data.result.totalDiscont;
      this.totalFinal = this.data.result.totalFinal;
      this.totalPrice();

      }else{
        this.toastService.presentToast("Something went wrong");
      }

      // this.navCtrl.navigateRoot('/cart');

    })
    .catch(console.log);

  } 

  removeaddtocart(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','removeProductFromCart');
    formdata.append('_session',session);
    formdata.append('productId',id);
    formdata.append('userId',userid);
    // formdata.append('qty',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.cartService.getCartItemCount();

      // this.navCtrl.navigateRoot('/cart');
      this.addtocart()
    })
    .catch(console.log);

  } 


  async qtyin(index: number){
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
  
    loader.present();
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');
    this.cart[index].quantity = parseInt(this.cart[index].quantity) + 1;
   
    var formdata = new FormData();
    formdata.append('_operation','updateCartProductQuantity');
    formdata.append('_session',session);
    formdata.append('productId',this.cart[index].id);
    formdata.append('userId',userid);
   // formdata.append('action',"increase");
    formdata.append('qty',this.cart[index].quantity);

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.cartService.getCartItemCount();
     

      // this.navCtrl.navigateRoot('/cart');
      this.addtocart();
      loader.dismiss();
     // return this.topdata1;

    })
    .catch(console.log);
  }

  async qtyde(index: number){
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
  
    loader.present();
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');
    if(this.cart[index].quantity > 1) {
    this.cart[index].quantity -= 1;

    var formdata = new FormData();
    formdata.append('_operation','updateCartProductQuantity');
    formdata.append('_session',session);
    formdata.append('productId',this.cart[index].id);
    formdata.append('userId',userid);
    //formdata.append('action',"decrease");
    formdata.append('qty',this.cart[index].quantity);

    

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.cartService.getCartItemCount();

      
      // this.navCtrl.navigateRoot('/cart');
      this.addtocart()
      loader.dismiss();

     // return this.topdata1;

    })
    .catch(console.log);
  }else{
    this.removeaddtocart(this.cart[index].id);
    loader.dismiss();

  }
  }


  totalPrice() {
    var price = 0;
    var subPrice = 0;
    for (let value of this.cart) {
      let sub = value.justodeal * value.quantity;
      subPrice = subPrice + sub;
      price = price + sub;
     
    }
    this.subtotal = subPrice;
    this.total = price;

  }


  placeorder(){
  let url = environment.baseurl
  const session = localStorage.getItem('session');
  const userid = localStorage.getItem('userid');
  const orderdetails = localStorage.getItem('orderdetails');

  var formdata = new FormData();
  formdata.append('_operation','placeOrder');
  formdata.append('_session',session);
  
  // formdata.append('module','SalesOrder');
  // formdata.append('values',"this.cart");
 
  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    if(this.data.success == true) {

      this.cartService.getCartItemCount();
      this.toastService.presentToast('Order placed successfully');
    this.navCtrl.navigateRoot('/payment-confirm');
    
    }else{
      this.toastService.presentToast(this.data.error.message);
    }

  })
  .catch(console.log);
}
  async removeItem() {
    const alert = await this.alertCtrl.create({
      header: 'Item remove',
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
                //showCloseButton: true,
                message: 'Item removed successfully .',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
              this.navCtrl.navigateForward('/home');
            });
          }
        }
      ]
    });

    await alert.present();
  }
 
  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }
 
  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }
 
  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }
 
  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }
 
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
 
}