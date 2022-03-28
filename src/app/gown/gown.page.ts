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
  selector: 'app-gown',
     templateUrl: './gown.page.html',
     styleUrls: ['./gown.page.scss'],
})
export class GownPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;

 loaddata = 0;
  topdata= []
  topdata1=[]
  deals=[]
  wishlist=[]
  deals1=[]
  finaldt:any;
  title:any;
  flag:any;
  data: any;
  page:any;
  filterid:any;
  Error_message: string = "";
  totalrecords: number = 0;
  scrollTopButton = false;
  limit:any;
  disable = 0;
  cart = [];
  items = [];
  datareceive:String="";
  loaderToShow: any;
  wishproducts= [];

  constructor(
    public navCtrl: NavController,
    public router:Router,
    private http: HttpClient,
    public cartService: CartService,
    public activatedRouter:ActivatedRoute,
    public loadingCtrl: LoadingController,

    ) {
        this.page =1;
        this.limit =5;

   }

  ngOnInit() {
    this.getwishlist();

    
   

    this.items = this.cartService.getProducts();
    //this.cart = this.cartService.getCart();
    //this.getproductlist();

    /* this.dealsproduct();
    this.dealsproduct1(); */
   

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

  getwishlist() {

  
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','getWishListProducts');
    formdata.append('_session',session);

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {

      this.data = response;
      if(this.data.success == true) {
      this.wishproducts =this.data.result.products;
      console.log('this.wishproducts', this.wishproducts);

      }

      this.activatedRouter.queryParams.subscribe((data)=>{
        this.finaldt = data.id;
        this.title = data.title;
        this.flag = data.flag;
       if(this.flag == 1) {
        this.getproductlist();
       }

       if(this.flag == 0) {
        this.productlistbycat();

       }

        if(this.finaldt != NaN || this.finaldt != undefined ){
         
        }
      });

    })
    .catch(console.log);


  }
  
  wishlistbtn(){
    this.navCtrl.navigateRoot('/wishlist');
  }
  search(){
    this.navCtrl.navigateRoot('/search');
  }

 
  addtocart(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');

    var formdata = new FormData();
    formdata.append('_operation','addToCart');
    formdata.append('_session',session);
    formdata.append('productId',id);
    formdata.append('userId',userid);
    formdata.append('qty',"1");

    this.http.post( url,formdata,{})
    .toPromise()
    .then((response :any) => {   
     // this.data = response;
    console.log("cartdataaa",response);
     this.cartService.getCartItemCount();
      // this.navCtrl.navigateRoot('/cart');
    //  return this.topdata1;
    }).catch(console.log);

  } 
 
   async getproductlist(event?){


    
    if (this.page == 1) {
      this.topdata = [];
    }
    const loader =  await this.loadingCtrl.create({
      duration: 3000
    });
  
    loader.present();
    let url = environment.baseurl;
    // localStorage.setItem('orderdata', JSON.stringify(this.data.result.products));
    const session = localStorage.getItem('session');
    //const finaldt = this.finaldt;
    var formdata = new FormData();
    formdata.append('_operation','getProductsBySubCategory');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);

    formdata.append('maxEntries',this.limit);
    formdata.append('page',this.page);
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {

      loader.dismiss();

      this.data = response;
      this.loaddata =1;

      if( this.data.result.products == null || this.data.result.products == 'null' || this.data.result.products == '') {

        this.Error_message = 'No any data found.';
        this.totalrecords=0;

      }else { 
          let pdata = this.data.result.products;

          if (this.page == 1) {
            this.topdata = new Array();
            this.scrollToTop();
           // this.infiniteScroll.disabled = false;
          }
          if (pdata.length != 0) {

            for (let value of pdata) {
              this.topdata.push(value);

      
              value.isfilled= 0;
                console.log('tp wish id', value.id);
                if(this.wishproducts != null) {
                var found = this.wishproducts.filter(e => e.id === value.id);
                if (found.length > 0) {
                  value.isfilled= 1;
                  console.log(found[0]);
                }
              }                       
          
               
            }
            if (event) {
              event.target.complete();
            }
          } else {
            if (event) {
              event.target.disabled = true;
            }
          }

          if (pdata.length == 0 || pdata.length < this.limit) {
           // this.infiniteScroll.disabled = true;
            this.disable = 1;
          }else{
            this.disable = 0;
          }
        }
        this.page = this.page+1;



     // this.topdata =this.data.result.products
      console.log("productlist",this.topdata);
    })
    .catch(console.log);


  }
  scrollToTop() {
    this.content.scrollToTop(0);
    this.scrollTopButton = false;
  }
  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
  }

  productlistbycat() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getOnlyProductsOfCategory');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.disable = 1;
      this.data = response;
      this.topdata1 =this.data.result.products
      console.log("productlistbycat",this.data.result.products);

      this.topdata1.forEach((items, index )=> {
      
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

         //console.log('totppppp',this.topdata1);
    //  return this.topdata1;
    })
    .catch(console.log);


  }

  /* dealsproduct() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getDealsOfTheDayProducts');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals =this.data.result.products
      console.log("dealslist",this.data.result.products);
      return this.topdata1;
    })
    .catch(console.log);


  }

  dealsproduct1() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getDealsOfTheDayProducts');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("dealslist1",this.data.result.products);
      return this.topdata1;
    })
    .catch(console.log);


  } */
  productdetails(id){
  this.router.navigate(['shirtdetail'],{queryParams:{id:id}})
  console.log("router id",id)
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



  

  showLoader() {
    this.loaderToShow = this.loadingCtrl.create({}).then(res => {
      res.present();

      res.onDidDismiss().then(dis => {
        console.log("Loading dismissed!");
      });
    });
    this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 1000);
  }
}

