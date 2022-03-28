import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  
  forgetpassform: FormGroup;
  otpform: FormGroup;
  userforgetpass:any ={}
  data: any;
  uid: any
  private loading: any;
  userotp: any={};
  error='';


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
  ) { }

  ngOnInit() {

    this.forgetpassform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
 } 
  async onsubmit() {
  this.error ='';
    let username = (<HTMLInputElement>document.getElementById('username')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;

    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mobileRegex = /^\d{10}$/;

    if(emailReg.test(email))
      {
        console.log("email")
        
    
        let url = environment.baseurl;
        var formdata = new FormData();
        formdata.append('_operation','forgotPassword');
        formdata.append('username',username);
        formdata.append('emailId',email);
    
        const loader = await this.loadingCtrl.create({
        });
    
        loader.present();
     
        // this.loading =  this.loaderPresent();
    
        this.http.post( url,formdata,{})
        .toPromise()
        .then(response => {
          loader.dismiss();
          console.log(response);
          if (this.loading) {
            this.loadingCtrl.dismiss();
            this.loading=false;
          }
          this.data = response;
         // alert(this.data.result.result);
    
          if (this.data.result.result == true) { 
            let emailuid = this.data.result.uid
            this.router.navigateByUrl('/reset-password?otpuid='+emailuid+'&type=email');
            // this.resetPass(emailuid);
            // this.resetPassMobile();
        
          }else{
            this.toastService.presentToast(this.data.result.message);
           return false;
            //
    
          //  swal.fire(JSON.stringify('Something Wrong'))
    
          //  this.toastService.presentToast('Something Wrong');
          }
        })
        .catch(console.log);
      } 
      else if(email.match(mobileRegex)) {
       
      
        console.log("phone")
        // document.getElementById("e_msg").innerHTML = "Phone valid<!";
        // return false;
        const loader = await this.loadingCtrl.create({
          duration: 2000
        });
    
        loader.present();
        
        let url = environment.baseurl;
        var formdata = new FormData();
        formdata.append('_operation','forgotPasswordMobileNumber');
        formdata.append('username',username);
        formdata.append('phone',email);
    
    
     
        // this.loading =  this.loaderPresent();
    
        this.http.post( url,formdata,{})
        .toPromise()
        .then(response => {
          loader.dismiss();
          console.log(response);
          if (this.loading) {
            this.loadingCtrl.dismiss();
            this.loading=false;
          }
          this.data = response;

          if(this.data.success ==false){
            this.toastService.presentToast(this.data.error.message);
      
           }
       
         // alert(this.data.result.result);
         if (this.data.result.result == true) { 
              let otpuid = this.data.result.uid
              console.log("otpuidold",otpuid)
              this.router.navigateByUrl('/reset-password?otpuid='+otpuid+'&type=phone');
            // this.resetPassMobile(otpuid);
            // this.resetPass();
        
          }else{
            this.toastService.presentToast(this.data.result.message);
           return false;
            //
    
          //  swal.fire(JSON.stringify('Something Wrong'))
    
          //  this.toastService.presentToast('Something Wrong');
          }
        })
        .catch(console.log);
    
    
      
    
      }else{
        this.error = 'The email address or phone number is invalid';
      }
    }
}
