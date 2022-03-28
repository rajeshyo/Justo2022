import { Component,ViewChild } from '@angular/core';
//import { ModalController } from '@ionic/angular';
//import { ImageModalPage } from '../image-modal/image-modal.page';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IonSlides } from '@ionic/angular';
import {Router} from '@angular/router';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {
  pushes: any = [];
  cdata= []
  brand=[]
  topdata= []
  deals=[]
  deals1=[]
  deals2=[]
  filtdt=[]
  data: any;
  userdata:any;
  cart=[]
  topdata1=[]
  advs=[];
  timer:any;
  lazyLoadImage = 'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5';
   images = ['1.png','1.png','1.png'];
   image = ['11c.png','10.png','11f.png'];
   image1 = ['11b.png','11d.png','11a.png'];
   image2 = ['11g.png','11h.png','11g.png'];
   show = true;
   sliderOpts = {
      zoom: true,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 20
    };
    @ViewChild('slideWithNav') slideWithNav: IonSlides;
    @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
    @ViewChild('slideWithNav3') slideWithNav3: IonSlides;
     
      sliderOne: any;
      sliderTwo: any;
      sliderThree: any;
      sliderBrand:any;
     
     
      //Configuration for each Slider
      slideOptsOne = {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          zoom: false
      }
      };

      slideOptsTwo_test = {
        initialSlide: 1,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
      }


      };
      slideOptsThree ={
        initialSlide: 1,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        autoplay: {
          disableOnInteraction: false
        }
       
      };

      slideOptsBrand ={
        initialSlide: 1,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        speed:3000,
        autoplay: {
          disableOnInteraction: false
        }
       
      };
      
      slideOptsTwo = {
        initialSlide: 1,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        autoplay: {
          disableOnInteraction: false
        }
      };
     
 constructor(  public plt: Platform, public navCtrl: NavController,  private http: HttpClient,public router:Router,    public loadingCtrl: LoadingController,private firebaseX: FirebaseX,
  public cartService: CartService ){
   
// console.log('home page aa gaya');

     
// push notification
let that= this;
    this.plt.ready()
    .then(() => {
     
   
this.firebaseX.getToken()
  .then(token => { console.log('The token is ${token}');  that.deviceRegiCrm(token);
}) // save the token server-side and use it to push notifications to this device
  .catch(error => console.error('Error getting token', error));

this.firebaseX.onMessageReceived()
  .subscribe(data => console.log('User opened a notification ${data}'));

this.firebaseX.onTokenRefresh()
  .subscribe((token: string) => { console.log('Got a new token ${token}');      
  //   that.deviceRegiCrm(token);
});

})
   this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: '../../assets/img/1.png'
          },
          {
            id: 2,
            image: '../../assets/img/2.png'
          },
          {
            id: 3,
            image: '../../assets/img/3.png'
          },
          
        ]
      };

     
 }


// Push notification device Reg
  deviceRegiCrm(token){

  let url = environment.baseurl;
  // const loginData = JSON.parse(localStorage.getItem('logindata'));
  const userid = localStorage.getItem('userid');
  const session = localStorage.getItem('session');
 
  var formdata = new FormData();
  formdata.append('_operation','registerWithCRM');
  formdata.append('_session',session);
  formdata.append('userid',userid);
  formdata.append('deviceId',token);
   

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {

    this.data = response;
    console.log('Token',JSON.stringify(this.data));
    if(this.data.success == true){
   
      console.log(this.data)
    }else{
      console.log('Token','Token is not connected with CRM');

    }
   
  })
  .catch(console.log);

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

@ViewChild('slider') slider: IonSlides;
page = "0";

selectedTab(index) {
   this.slider.slideTo(index);
}

async moveButton() {
   let index = await this.slider.getActiveIndex();
   this.page = index.toString();
} 


ngOnInit() {
  //this.pushnotification();
 // this.productcat();
  this.topproductcat();
  this.dealsoftheday();
  this.dealsoftheday1();
  //this.productbrand();
  this.localdata();
  this.advertiseBanner();
  //this.getCoundownTimer();
}




home(){
  this.navCtrl.navigateRoot('/home');
}
wishlistbtn(){
  this.navCtrl.navigateRoot('/wishlist');
}


search(){
  this.navCtrl.navigateRoot('/search');
}
profileedit(){
  this.navCtrl.navigateRoot('/profile');
}

localdata(){
  const loginData = JSON.parse(localStorage.getItem('logindata'));
  this.userdata=loginData
return this.userdata
}

/* async productcat() {
  
  const loader =  await this.loadingCtrl.create({
    duration: 2000
  });

  loader.present();
  let url = environment.baseurl;
  // const loginData = JSON.parse(localStorage.getItem('logindata'));
  const session = localStorage.getItem('session');
  // console.log("userdata",this.userlog)
  var formdata = new FormData();
  formdata.append('_operation','getProductsByCategory');
  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    loader.dismiss();

    this.data = response;
    if(this.data.success == true){
    this.cdata =this.data.result.productCategories;

    this.sliderTwo =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems:this.cdata
    };    
    // this.cdata = this.chunk(this.cdata, 2);
    
    }
   
  })
  .catch(console.log);
} */

 chunk(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
          chunked_arr.push([array[i]]);
      } else {
          last.push(array[i]);
      }
  }
  return chunked_arr;
}

getCoundownTimer(fulldate,index) {
  let countDownDate = new Date(fulldate).getTime();

  const date = new Date();

  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

   // Time calculations for days, hours, minutes and seconds
   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
   let hours = Math.floor((distance) / (1000 * 60 * 60));
   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
  let minute = minutes < 10 ? "0" + minutes : minutes;
  let hour = hours < 10 ? "0" + hours : hours;
  let day = days < 10 ? "0" + days : days;
  let second = seconds < 10 ? "0" + seconds : seconds;

  //console.log(date);
  if(hours > 0){
    this.deals[index].timer =  hour + "h : "
    + minute + "m : " + second + "s";
  }else if(days <= 0 && hours <= 0){
    this.deals[index].timer =  minute + "m : " + second + "s";
  }
  else{
    this.deals[index].timer = minute + "m : " + second + "s";
  }
  
  setTimeout(() => {
   this.getCoundownTimer(fulldate, index);
   }, 1000)
}
async topproductcat() {
  // console.log("enter topproductcat function")
  let url = environment.baseurl
  // const loginData = JSON.parse(localStorage.getItem('logindata'));
  const session = localStorage.getItem('session');
  // console.log("userdata",this.userlog)
  const loader =  await this.loadingCtrl.create({
    duration: 2000
  });

  loader.present();
  var formdata = new FormData();
  formdata.append('_operation','topProductsByCategory');
  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    loader.dismiss();

    this.data = response;
    if(this.data.success == true){
      this.sliderTwo =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems:this.data.result.productCategories
      };    
      console.log('this.sliderTwo',this.sliderTwo);

    this.topdata =this.data.result.productCategories;

   
    }  

// for (let i = 0; i < this.topdata.length; i++) {
//   for (let j = 0; j < this.topdata[i].SubCategory.length; j++) {
//     this.filtdt=this.topdata[i].SubCategory[j].id
//   console.log("this  is id",this.filtdt)


//   // this.router.navigate(['gown'],{queryParams:{data:fdata}})
//   }
// }
  })
  .catch(console.log);


}

dealsoftheday() {
  let url = environment.baseurl
  const session = localStorage.getItem('session');
  var formdata = new FormData();
  formdata.append('_operation','getDealsOfTheDay');
  formdata.append('type','Deal Of The Day');

  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {

    this.data = response;

    if(this.data.success == true){
    this.deals =this.data.result.banners;
  /*   this.deals.push({"label":"DODT 3","id":"3325","imagePath":"https:\/\/justoapp.co.in\/justo\/\/storage\/2022\/January\/week1\/4095_91a8746c9b22744f9bc8a3abb61acd47.png","dealEndingDate":"2022-01-17","dealEndingTime":"13:30:00","timeLeft":{"y":0,"m":0,"d":1,"h":11,"i":0,"s":3,"f":0.09645900000000000307220915374273317866027355194091796875,"weekday":0,"weekday_behavior":0,"first_last_day_of":0,"invert":0,"days":1,"special_type":0,"special_amount":0,"have_weekday_relative":0,"have_special_relative":0}});
    //this.deals[1].dealEndingDate = '2022-01-17';
    console.log( this.deals); */

    let that = this;
    this.deals.forEach((items, index )=> {
    //  that.deals[1] = items;
      //that.deals[1].dealEndingDate = '2022-01-17';
       var fulldate = items.dealEndingDate +' '+items.dealEndingTime;
       console.log(fulldate);
       items.timer = '';
       this.getCoundownTimer(fulldate, index);
      

     });

     
    }

  })
  .catch(console.log);


}



dealsoftheday1() {
  let url = environment.baseurl
  const session = localStorage.getItem('session');
  var formdata = new FormData();
  formdata.append('_operation','getDealsOfTheDay');
  formdata.append('type','Hyper Deal');

  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    if(this.data.success == true){

    this.deals1 =this.data.result.banners
    }   

  })
  .catch(console.log);


}
advertiseBanner() {
  let url = environment.baseurl
  const session = localStorage.getItem('session');
  var formdata = new FormData();
  formdata.append('_operation','getDealsOfTheDay');
  formdata.append('type','Branding Space');

  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    if(this.data.success == true){
console.log(this.data.result);
    this.advs =this.data.result.banners
    }   

  })
  .catch(console.log);


}

productbrand() {
  let url = environment.baseurl
  // const loginData = JSON.parse(localStorage.getItem('logindata'));
  const session = localStorage.getItem('session');
  // console.log("userdata",this.userlog)
  var formdata = new FormData();
  formdata.append('_operation','getBrands');
  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    if(this.data.success == true){

    this.brand =this.data.result.records

    this.sliderBrand =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems:this.brand
    };
        }   
  })
  .catch(console.log);
}
productdata(id,title,flag){
  this.router.navigate(['gown'],{queryParams:{id:id,title:title,flag:flag}})
  console.log("router id",id)
}

dealdata(id,title){

  let url = environment.baseurl
  const session = localStorage.getItem('session');
  const userid = localStorage.getItem('userid');

  var formdata = new FormData();
  formdata.append('_operation','addAllBannerProductsToCart');
  formdata.append('_session',session);
  formdata.append('id',id);

  this.http.post( url,formdata,{})
  .toPromise()
  .then((response :any) => {   
   // this.data = response;
  console.log("cartdataaa",response);
 // this.cartService.getCartItemCount();
 this.navCtrl.navigateRoot('/cart');
  //  return this.topdata1;
  }).catch(console.log);
 /*  this.router.navigate(['deals'],{queryParams:{id:id,title:title}})
  console.log("router id",id) */
}


}





