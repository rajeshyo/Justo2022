import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {SignupService} from '../services/signup.service'
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  userlog:any ={}
  data: any;
  VtCustProductCategory:any[];
  ProductSubCategory:any[];
  Products:any[];
  Brands=[];
  fdata=[];
  deals1=[];
  wishproducts= [];
  constructor(
    public cartService: CartService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router:Router,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private delarapi:SignupService,
    private toastService: ToastService, 
  ) { }

  ngOnInit() {
  }
  wishlis1(id) {
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
          // this.removeaddtocart(id);

          // this.navCtrl.navigateRoot('/wishlist');
    }else{
      // this.toastService.presentToast(this.data.error.message);
      
    }

    })
    .catch(console.log);

  }
  async toggleWishlist(product:any) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');
    const loader =  await this.loadingCtrl.create({
      duration: 3000
    });
  
    loader.present();
   let value = "0";
    if(product.isfilled == 0){
      value = "1";
    }
    var formdata = new FormData();
    formdata.append('_operation','addtowishlist');
    formdata.append('_session',session);
    formdata.append('record',product.id);
    formdata.append('module',"Products");
    formdata.append('value',value);
  
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();
      this.data = response;
    if(this.data.success == true) {  
      if(product.isfilled == 0){
  
      product.isfilled =1;
      }
  
      else if(product.isfilled ==1){
        product.isfilled =0;
      }
    }else{
  
    }
  
    })
    .catch(console.log);
  
  }
  productdetails(id){
  this.router.navigate(['shirtdetail'],{queryParams:{id:id}})
  console.log("router id",id)
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
      this.deals1 =this.data.result.products
      console.log("cartdataaa",this.data.result.products);
      this.navCtrl.navigateRoot('/cart');
      // return this.topdata1;

    })
    .catch(console.log);


  } 
  
  search() {
    let url = environment.baseurl
    // const loginData = JSON.parse(localStorage.getItem('logindata'));
    const session = localStorage.getItem('session');
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    formdata.append('_operation','getGlobalSearch');
    formdata.append('_session',session);
    formdata.append('value',this.userlog.username);
  
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      // this.VtCustProductCategory =this.data.result.VtCustProductCategory
      // this.ProductSubCategory =this.data.result.ProductSubCategory
      // this.Brands =this.data.result.Brands
      
      this.Products =this.data.result.records

      
      console.log("searchdata",this.data.result.records);

      this.Products.forEach((items, index )=> {
      
        items.isfilled= 0;
        console.log('wish id', items.id);
        if(this.wishproducts != null) {
        var found = this.wishproducts.filter(e => e.id === items.id);
        if (found.length > 0) {
          items.isfilled= 1;
          console.log(found[0]);
        }
      }                       
  
       });

      // this.fdata=this.fdata.concat(this.VtCustProductCategory,this.ProductSubCategory,this.Brands,this.Products)
      // console.log("mydata",this.fdata)
      return this.Products;
  
    })
    .catch(console.log);
  }
  resetFilters_clear(ev: any) {
   
    let val = ev.target.value;
    if (val.length <= 0) {


      //this.infiniteScroll.disabled = false;
   //   console.log(this.infiniteScroll.disabled);
      this.resetFilters(); 
       }
   
  }

  resetFilters() {
  //  this.userlog.username = "";
    this.Products = Array();
  }

}
