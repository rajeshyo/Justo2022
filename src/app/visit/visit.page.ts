import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {
  @ViewChild('filechooser', { static: false }) fileChooserElementRef: ElementRef;
  visitform: FormGroup;
  userInfo:any = {};
  visitdata = { "dealername": "", "purpose": "" ,'other_exaplanation':"", 'latitude':"", 'longitude':"", 'phone':""};

  data: any;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: string;
  locationCoords: any;
  timetest: any;
 
  constructor(    
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private toastService: ToastService, 
    private diagnostic: Diagnostic,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy

    ) {
      let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); }
      let errorCallback = (e) => console.error(e);


      this.diagnostic.isGpsLocationAvailable().then(successCallback).catch(errorCallback);
      this.locationCoords = {
        latitude: "",
        longitude: "",
        accuracy: "",
        timestamp: ""
      }
      this.timetest = Date.now();
     }

    

  ngOnInit() {
//this.getCurrentCoordinates();
    const loginData = JSON.parse(localStorage.getItem('logindata'));
    this.userInfo=loginData;
    console.log(this.userInfo,localStorage.getItem("userid"));
    this.visitform = new FormGroup({
      dealername: new FormControl('', [ Validators.required, Validators.maxLength(200)]),
      purpose: new FormControl('', [Validators.required]),
      other_exaplanation: new FormControl(''),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9 ]*')]),
     

    });
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
 
  // Methos to get device accurate coordinates using device GPS
  /* getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  } */

  async saveData() {

    console.log(this.visitform);
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    let url = environment.baseurl;
    var formdata = new FormData();
    let userID = localStorage.getItem("userid");
    formdata.append('_operation', 'saveRecord');
    formdata.append('_session', localStorage.getItem("session"));
    formdata.append('module', 'Visit');

    let values:any= {};

/*     values.visit_name = "visited client location banglore";
 */    //values.cf_861 = "new delhi"; // check in location
    values.cf_863 = this.address; // check out location
    values.assigned_user_id = userID;
    values.cf_972 = this.visitform.get('dealername').value.toLocaleUpperCase(); // Dealer name
    values.visit_purpose = this.visitform.get('purpose').value; // purpose of visit
    values.other_exaplanation = this.visitform.get('other_exaplanation').value; // purpose of visit
    values.cf_978 = this.latitude;
    values.cf_976 = this.longitude;
    values.cf_989 = this.visitform.get('phone').value;
    formdata.append('values', JSON.stringify(values));

        this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();

      this.data = response;
      
      // localStorage.setItem('userdata', this.data);

      console.log(this.data);

       if (this.data.success == true) { 

        this.toastService.presentToast('Data saved successfully');
        this.visitform.reset();

        this.navCtrl.navigateRoot('/visit');

      
    
      }else{
        this.toastService.presentToast('Something Wrong');

      } 
    })
    .catch(console.log);
   
 
    }

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddress(this.latitude, this.longitude);
      //console.log('address', this.address);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  // get address using coordinates
  getAddress(lat,long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.address = this.generateAddress(res[0]);
    

     // this.address = res[0].locality;
      console.log(JSON.stringify(res[0]));
      //this.address = this.pretifyAddress(res[0]);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }


  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
  /* // address
  pretifyAddress(address){
    let obj = [];
    let data = "";
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      data += obj[val]+', ';
    }
    return address.slice(0, -2);
  } */

}
