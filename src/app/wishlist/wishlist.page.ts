import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  cart = [];
  items = [];
  data: any;
  deals1=[]
  deals=[]
  topdata1=[]
  topdata=[];
  loaddata = 0;

  constructor(
    private modalCtrl: ModalController,
    public cartService: CartService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activatedRouter:ActivatedRoute,
    private http: HttpClient,
    public router:Router,

    ) { }

  ngOnInit() {
    this.items = this.cartService.getProducts();
   // this.cart = this.cartService.getCart();
    this.getwishlist();


  }

  async removewishlist(id) {

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
  
    loader.present();
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addtowishlist');
    formdata.append('_session',session);
    formdata.append('record',id);
    formdata.append('module',"Products");
    formdata.append('value',"0");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();
      this.data = response;
      this.cartService.getCartItemCount();
      this.getwishlist();

    })
    .catch(console.log);


  }
  
  async getwishlist() {

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
  
    loader.present();
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','getWishListProducts');
    formdata.append('_session',session);

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {

      loader.dismiss();
   this.loaddata =1;
      this.data = response;
      if(this.data.success == true) {
      this.deals =this.data.result.products;

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
      this.removewishlist(id);
      this.cartService.getCartItemCount();
      this.navCtrl.navigateRoot('/cart');

    })
    .catch(console.log);


  } 

  productdetails(id){
    this.router.navigate(['shirtdetail'],{queryParams:{id:id}})
    console.log("router id",id)
  }

  
 
}
