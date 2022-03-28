import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetpassform: FormGroup;
  otpform: FormGroup;
  userresetpass:any ={}
  data: any;
  uid: any
  type: any
  private loading: any;
  userotp: any={};
  PasswordValidator: any

  form: FormGroup = new FormGroup({});

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
    private fb: FormBuilder,
  ) {
    this.uid =this.route.snapshot.queryParamMap.get('otpuid')
    this.type =this.route.snapshot.queryParamMap.get('type')

    this.form = fb.group({
      otp:['', [Validators.required,Validators.maxLength(6),Validators.pattern('[0-9 ]*')]],
      newpass: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('newpass', 'confirm_password')
    })

   }

  ngOnInit() {

    // this.resetpassform = new FormGroup({
    //   otp: new FormControl('', [Validators.required,Validators.maxLength(6),Validators.pattern('[0-9 ]*')]),
    //   newpass: new FormControl('', [ Validators.required, Validators.minLength(4),Validators.pattern('^\\S*$')]),

    //   repass: new FormControl('', [Validators.required,Validators.minLength(4)]),

    // },{
    //   // validators: this.MustMatch('newpass', 'repass')
    // })


    // this.resetpassform = new FormGroup({
    //   otp: new FormControl('', [Validators.required,Validators.maxLength(6),Validators.pattern('[0-9 ]*')]),
    //   newpass: new FormControl('', Validators.compose([
    //     Validators.minLength(4),
    //     Validators.required,
    //     Validators.pattern('^\\S*$')
    //   ])),
    //   repass: new FormControl('', Validators.required)
    // }, (formGroup: FormGroup) => {
    //   console.log("matchh",this.PasswordValidator)
    //   return this.PasswordValidator.areNotEqual(formGroup);
    // });


  }

  get f(){
    return this.form.controls;
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
 } 
  async onsubmit() {

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    console.log("dataotp",this.userotp)
    let url = environment.baseurl
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    if(this.type == 'email'){
      formdata.append('_operation','forgotPasswordReset');

    }

    

    if(this.type == 'phone'){
      formdata.append('_operation','forgotPasswordResetMobileNumber');

    }
    
    formdata.append('otp',this.userresetpass.otp);
    formdata.append('uid',this.uid);
    formdata.append('newPassword',this.userresetpass.newpass);
    formdata.append('repeatnewPassword',this.userresetpass.repass);
  
    // this.loading =  this.loaderPresent();
  
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();
  
      this.data = response;
     if(this.data.success ==false){
      this.toastService.presentToast(this.data.error.message);

     }
    else if (this.data.result.result == true) { 
        this.toastService.presentToast(this.data.result.message.message);
        this.navCtrl.navigateRoot('/signup');
        // this.resetPass(emailuid);
        // this.resetPassMobile();
    
      }else{
        this.toastService.presentToast(this.data.result.message);
      }
      // localStorage.setItem('userdata', this.data);
  
      console.log(this.data.success);
  
    })
    .catch(console.log);
  
  
  }

  MustMatch(controlName: string, machingControlName: string){
    return(fromGroup1:FormGroup)=>{
      const control = fromGroup1.controls[controlName];
      const matchingControl = fromGroup1.controls[machingControlName];
      if(matchingControl.errors && !matchingControl.errors.MustMatch){
        return;
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true});

      }else{
        matchingControl.setErrors(null);
      }
      
    }
  }

}
