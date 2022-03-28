import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userlog:any ={}
  data: any;
  error= '';
  private loading: any;
phone:any;
  
  loginform: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    public router: Router,
    private toastService: ToastService, 
  ) { }

  ngOnInit() {

    this.loginform = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9 ]*')]),
      
    });

  }
  onChangeusername(){
    this.error ='';
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
//   ionViewDidLeave() {
//     this.menuCtrl.enable(true);
//  } 
  async onsubmit(data) {
    console.log(data.phone)
    let url = environment.baseurl
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    formdata.append('_operation','PreLoginWithOtp');
    formdata.append('phone',data.phone);
    
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
        this.toastService.presentToast(this.data.result.message);
        this.router.navigateByUrl('/otp?uid='+this.data.result.uid);
      } else{
        console.log("errrrr",this.data.error.message)

        this.error = this.data.error.message;
        this.toastService.presentToast(this.data.error.message);
      }
      // localStorage.setItem('userdata', this.data);
      // this.navCtrl.navigateRoot('/otp');
      // console.log(this.data.success);

    })
    .catch(console.log);
  
  
  }


}

