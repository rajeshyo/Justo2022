import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-catalouge',
  templateUrl: './catalouge.page.html',
  styleUrls: ['./catalouge.page.scss'],
})
export class CatalougePage implements OnInit {
  cdata= [];
  data: any;
  page = "1";

  constructor(public navCtrl: NavController,  private http: HttpClient, public router:Router,    public loadingCtrl: LoadingController,
    public cartService: CartService) { }

  ngOnInit() {
    this.productcat();

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

  productdata(id,title,flag){
    this.router.navigate(['gown'],{queryParams:{id:id,title:title,flag:flag}})
    console.log("router id",id)
  }

  async productcat() {
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

      }
     
    })
    .catch(console.log);
  }
}
