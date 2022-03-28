import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-reset-password-mobile',
  templateUrl: './reset-password-mobile.page.html',
  styleUrls: ['./reset-password-mobile.page.scss'],
})
export class ResetPasswordMobilePage implements OnInit {
  resetpassform: FormGroup;
  otpform: FormGroup;
  userresetpass:any ={}
  data: any;
  uid: any
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
  ) {
    this.uid =this.route.snapshot.queryParamMap.get('otpuid')

   }

  ngOnInit() {

    this.resetpassform = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      newpass: new FormControl('', [Validators.required]),
      repass: new FormControl('', [Validators.required]),

    });
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  onsubmit() {
    console.log("dataotp",this.userotp)
    let url = environment.baseurl
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    formdata.append('_operation','forgotPasswordResetMobileNumber');
    formdata.append('otp',this.userresetpass.otp);
    formdata.append('uid',this.uid);
    formdata.append('newPassword',this.userresetpass.newpass);
    formdata.append('repeatnewPassword',this.userresetpass.repass);
  
    // this.loading =  this.loaderPresent();
  
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.loadingCtrl.dismiss();
  
      this.data = response;
      if(this.data.result.result == false ){
        this.toastService.presentToast(this.data.result.message);
//this.navCtrl.navigateRoot('/forget-password');
      } else{
        this.navCtrl.navigateRoot('/login');
      }
      // localStorage.setItem('userdata', this.data);
  
      console.log(this.data.success);
  
    })
    .catch(console.log);
  
  
  }

}
