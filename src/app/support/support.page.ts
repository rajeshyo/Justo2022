import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  userform: FormGroup;
  userInfo:any = {};
  data: any;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private toastService: ToastService, 

  ) { }

  ngOnInit() {
    const loginData = JSON.parse(localStorage.getItem('logindata'));
    this.userInfo=loginData;
    console.log(this.userInfo,localStorage.getItem("userid"));
    this.userform = new FormGroup({

      ticket: new FormControl('', [ Validators.required, Validators.maxLength(150)]),
     
     

    });

  }

  async saveData() {

    console.log(this.userform);
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    let url = environment.baseurl;
    var formdata = new FormData();
    let userID = localStorage.getItem("userid");
    formdata.append('_operation', 'updateProfile');
    formdata.append('_session', localStorage.getItem("session"));
    formdata.append('userId', userID);
    formdata.append('ticket', this.userform.get('ticket').value);
  

        this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();

      this.data = response;
      
      // localStorage.setItem('userdata', this.data);

      console.log(this.data);

       if (this.data.success == true) { 
         this.userInfo.imagename = this.data.result.userDetails.imagename;
        localStorage.setItem('logindata', JSON.stringify(this.data.result.userDetails));

        this.toastService.presentToast(this.data.result.message);


      this.navCtrl.navigateRoot('/home');
    
      }else{
        this.toastService.presentToast('Something Wrong');
      this.navCtrl.navigateRoot('/support');

      } 
    })
    .catch(console.log);
   
 
    }
}
