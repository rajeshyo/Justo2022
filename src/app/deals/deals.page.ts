import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { NavController, LoadingController, ToastController, AlertController, IonInfiniteScroll,
//   IonContent } from '@ionic/angular'; 
import { NavController, MenuController, ToastController, AlertController, LoadingController,IonInfiniteScroll,IonContent } from '@ionic/angular';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {
  loaddata = 0;
  topdata= [];
  Error_message: string = "";
  finaldt:any;
  title:any;
  data: any;

  constructor(
    public navCtrl: NavController,
    public router:Router,
    private http: HttpClient,
    public cartService: CartService,
    public activatedRouter:ActivatedRoute,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {

    this.activatedRouter.queryParams.subscribe((data)=>{
      this.finaldt = data.id;
      this.title = data.title;

      this.getproductlist();

   
  });
  }

  wishlistbtn(){
    this.navCtrl.navigateRoot('/wishlist');
  }
  search(){
    this.navCtrl.navigateRoot('/search');
  }

 async getproductlist() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getDealsOfTheDayProducts');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);

    const loader =  await this.loadingCtrl.create({
      duration: 3000
    });
  
    loader.present();
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();

      this.loaddata =1;

      this.data = response;
      this.topdata =this.data.result.products
      console.log("productlistbycat",this.data.result.products);
    //  return this.topdata1;
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
     // console.log("cartdataaa",this.data);
      this.cartService.getCartItemCount();
      // this.navCtrl.navigateRoot('/cart');

    //  return this.topdata1;

    })
    .catch(console.log);


  } 

  productdetails(id){
    this.router.navigate(['shirtdetail'],{queryParams:{id:id}})
    console.log("router id",id)
  }
}
