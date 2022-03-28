import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  loginform: FormGroup;
  otpform: FormGroup;
  userlog:any ={}
  data: any;
  uid: any;
  error='';
  private loading: any;
  userotp: any={};

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    private toastService: ToastService, 
    public cartService : CartService,
  
  ) { 
    this.uid =this.route.snapshot.queryParamMap.get('uid');
    if(!this.uid){
      this.navCtrl.navigateRoot('/login');

    }
  }

  ngOnInit() {
    this.otpform = new FormGroup({
      otp: new FormControl('', [Validators.required]),
    });
  }
  move(e:any, p:any, c:any, n:any){
    console.log("length",e)
  var length1 = c.value.length;
  console.log("length",length1)
  var maxlength = c.getAttribute('maxlength');
  if(length1 == maxlength){
    if(n != ""){
      n.focus();
    }
  }
  if(e.key === "Backspace"){
    if(n != ""){
      n.focus();
    }
  }
  }

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
 }

 onChangeotp(){
  this.error ='';
}
ionViewWillEnter() {
  this.menuCtrl.enable(false);
}
ionViewDidLeave() {
  this.menuCtrl.enable(true);
} 
jump(field, automove){
if(field.value.length>= field.maxLength){
  document.getElementById(automove).focus();
}
}


async onsubmit() {
  console.log("dataotp",this.userotp)
  let url = environment.baseurl
  // console.log("userdata",this.userlog)
  var formdata = new FormData();
  formdata.append('_operation','DoOtpLogin');
  formdata.append('uid',this.uid);
  formdata.append('otp',`${this.userotp.otp1}${this.userotp.otp2}${this.userotp.otp3}${this.userotp.otp4}${this.userotp.otp5}${this.userotp.otp6}`);
  
  const loader = await this.loadingCtrl.create({
    duration: 2000
  });

  loader.present();

  // this.loading =  this.loaderPresent();

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    loader.dismiss();

    this.data = response;

    if(this.data.success == true ){
      if(this.data.result.result == false ){
        this.error = this.data.result.message;
        this.toastService.presentToast(this.data.result.message);
      }
      if (this.data.result.login.isVerifiedUser == true) { 

        this.toastService.presentToast('Login Successful');
        localStorage.setItem('logindata', JSON.stringify(this.data.result.login.userdetails));
        localStorage.setItem('userid', this.data.result.login.userid);
        localStorage.setItem('roleid', this.data.result.login.userdetails.roleid);
        localStorage.setItem('rolename', this.data.result.login.userdetails.rolename);
        localStorage.setItem('session', this.data.result.login.session);
        this.cartService.getCartItemCount();

        this.navCtrl.navigateRoot('/home');
    
      }else{
      

        // this.toastService.presentToast(this.data.result.message);
       /* this.toastService.presentToast('Something Wrong');
      this.navCtrl.navigateRoot('/verification'); */

      this.showVerificationAlert();

      }
    
     
    
    } else{
      // this.error = this.data.error.message;
      // this.toastService.presentToast(this.data.error.message);
      this.toastService.presentToast('OTP is Invalid');
    }
   /*  if(this.data.result.result == true ){
      localStorage.setItem('logindata', JSON.stringify(this.data.result.login.userdetails));
      localStorage.setItem('userid', this.data.result.login.userid);
      localStorage.setItem('roleid', this.data.result.login.userdetails.roleid);
      localStorage.setItem('rolename', this.data.result.login.userdetails.rolename);
      localStorage.setItem('session', this.data.result.login.session);
      this.cartService.getCartItemCount();
      this.navCtrl.navigateRoot('/home');
    } else{
      this.error =this.data.result.message;
      this.toastService.presentToast(this.data.result.message);
      
    } */
    // localStorage.setItem('userdata', this.data);

   // console.log(this.data.success);

  })
  .catch(console.log);


}

showVerificationAlert() {
  this.alertCtrl.create({
    header: 'Your Verification is Pending',
    message: 'Contact our Admin',
    backdropDismiss: false,
    buttons: [{
      text: 'Exit',
      handler: () => {
        //navigator['app'].exitApp();
      }
    }]
  })
    .then(alert => {
      alert.present();
    });
}
}
