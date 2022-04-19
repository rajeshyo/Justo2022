import { Component,OnInit } from '@angular/core';
import { NavController,LoadingController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';

 @Component({
  selector: 'app-shirtdetail',
   templateUrl: './shirtdetail.page.html',
   styleUrls: ['./shirtdetail.page.scss'],
})

export class ShirtdetailPage implements OnInit {
  cart = [];
  items = [];
  images = ['shirt1.png','shirt1.png','shirt1.png'];
  show = false;
  loaderToShow: any;
  loadadta =0;
  private isButtonVisible = true;
  private isButtonVisible1 = false;
  public details: { [k: string]: any } = {};
  loaddata1 = 0;
  cdata= []
  topdata= []
  topdata1=[]
  deals=[]
  deals1=[]
  finaldt:any;
  data: any;
  features:any;
  specifications:any;
  inboundClick = true;
  outboundClick = false;

    constructor(public activatedRouter:ActivatedRoute, private http: HttpClient, public navCtrl: NavController, public cartService: CartService, public loadingCtrl: LoadingController
      ){}
  ngOnInit() {

    this.activatedRouter.queryParams.subscribe((data)=>{
      this.finaldt = data.id;
     

  })

  this.detailproduct();
  this.addtocart1();
    this.items = this.cartService.getProducts();
    //this.cart = this.cartService.getCart();

    

  }

  async addtocart1() {


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
     
      this.data = response;
    

      if(this.data.success ==true) {
        this.cart =this.data.result.products;
      console.log("cartdatattt",this.cart)

      var found =  this.cart.filter(e => e.id );
      if (found.length > 0) {
        console.log("uiui",found[0]);
        return found[0].id;
      }
      


    //   for(let el of this.cart){
    //     console.log("hgj",el.id);
    //     var idd = el.id
    //     // return idd;
    //  }

      }else{
        // this.toastService.presentToast("Something went wrong");
      }

      // this.navCtrl.navigateRoot('/cart');

    })
    .catch(console.log);

  } 



 
  wishlistbtn(){
    this.navCtrl.navigateRoot('/wishlist');
  }
  async detailproduct() {

    const loader =  await this.loadingCtrl.create({
      duration: 3000
    });
  
    loader.present();
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getProductDetails');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();
    this.loadadta =1;
      this.data = response;
      if(this.data.success == true) {
      this.details =this.data.result.productsDetails
      let specs = this.details.cf_919;
      this.specifications = specs.split(',');
      let featr = this.details.cf_927;
      this.features = featr.split(',');
      console.log('this.feature',this.features);
      console.log("detailsproductdata",this.data.result.productsDetails);
      }
    })
    .catch(console.log);


  }

  addtocart(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addToCart');
    formdata.append('_session',session);
    formdata.append('productId',id);
    formdata.append('userId',userid);
    formdata.append('qty',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.cartService.getCartItemCount();

      this.navCtrl.navigateRoot('/cart');

    })
    .catch(console.log);


  } 
 
  goToEditProfile() {
    this.navCtrl.navigateForward('/continue-shop');
  }
  
 
}
 



