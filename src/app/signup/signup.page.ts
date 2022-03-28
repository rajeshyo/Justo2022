
import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {SignupService} from '../services/signup.service'
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment';
import { PopoverController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit{

@ViewChild('filechooser', { static: false }) fileChooserElementRef: ElementRef;
delerform: FormGroup;
vendorform: FormGroup;
loginform: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  user: any ={publicid:"0fb102811b5b31e284a3762b4b2f918c"} // vendor
  user1: any ={publicid:"512d3a435929400d01b2f59431d6e42d"} // dealer
  userlog:any ={}
  data: any;
  emailuid:any
  error ='';
  segment =0;
  private loading: any;
  myfile:any;
  myfile1:any;
  myfile2:any;
  myfile3:any;
  image_type:any;
  @ViewChild('slider') slider: IonSlides;
  page = "0";
  pinerror="";
 
 selectedTab(index) {
     this.slider.slideTo(index);
 }
 
 async moveButton() {
     let index = await this.slider.getActiveIndex();
     this.page = index.toString();
 } 

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private delarapi:SignupService,
    private toastService: ToastService, 
    public popoverController: PopoverController,
    public cartService : CartService,
    private router: Router
    ) { 

  }

  ngOnInit() {

    this.delarapi.signupdelar().subscribe((resp)=>{
      console.log(resp)
    })
   
 
    this.loginform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
      
      
    });    

    this.delerform = new FormGroup({

      accountname: new FormControl('', [ Validators.required, Validators.minLength(3)]),
      //cf_885: new FormControl('', [ Validators.required, Validators.minLength(3)]),
      cf_893: new FormControl('', [ Validators.required, Validators.minLength(3),Validators.pattern('^\\S*$')]),
      cf_895: new FormControl('', [ Validators.required, Validators.minLength(4),Validators.pattern('^\\S*$')]),
      cf_891: new FormControl('', [ Validators.required]),
      cf_887: new FormControl('', [ Validators.required]),
      
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9 ]*')]),
      cf_889: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]),
      email1: new FormControl('', [Validators.required, Validators.email]),
      cf_873: new FormControl('', [Validators.required, Validators.pattern('^([A-Z]){5}([0-9]){4}([A-Z]){1}?$')]),
      myfile: new FormControl('', [ Validators.required]),
      myfile1: new FormControl('', [ Validators.required]),
      bill_street: new FormControl('', [ Validators.required, Validators.minLength(4)]),
      shopno: new FormControl('', []),
      landmark: new FormControl('', [ Validators.required]),
      bill_code: new FormControl('', [ Validators.required,Validators.minLength(6),Validators.maxLength(6), Validators.pattern('[0-9 ]*')]),
      bill_city: new FormControl('', [ Validators.required]),
      taluk: new FormControl('', [ Validators.required]),
      district: new FormControl('', [ Validators.required]),
      bill_state: new FormControl('', [ Validators.required]),
      termsAndConditions: new FormControl(undefined, [Validators.required])

      
    });

    this.vendorform = new FormGroup({
      //
      vendorname: new FormControl('', [ Validators.required, Validators.minLength(3)]),
      //cf_875: new FormControl('', [ Validators.required, Validators.minLength(3)]),
      cf_897: new FormControl('', [ Validators.required, Validators.minLength(3),Validators.pattern('^\\S*$')]),
      cf_899: new FormControl('', [ Validators.required, Validators.minLength(4),Validators.pattern('^\\S*$')]),
      cf_877: new FormControl('', [ Validators.required]),
      cf_879: new FormControl('', [ Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9 ]*')]),
      cf_881: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cf_883: new FormControl('', [Validators.required, Validators.pattern('^([A-Z]){5}([0-9]){4}([A-Z]){1}?$')]),
      myfile2: new FormControl('', [ Validators.required]),
      myfile3: new FormControl('', [ Validators.required]),
      street: new FormControl('', [ Validators.required, Validators.minLength(4)]),
      shopno: new FormControl('', []),
      landmark: new FormControl('', [ Validators.required]),
      postalcode: new FormControl('', [ Validators.required,Validators.minLength(6),Validators.maxLength(6), Validators.pattern('[0-9 ]*')]),
      city: new FormControl('', [ Validators.required]),
      taluk: new FormControl('', [ Validators.required]),
      district: new FormControl('', [ Validators.required]),
      state: new FormControl('', [ Validators.required]),
      termsAndConditions: new FormControl(undefined, [Validators.required])


    });
  }


getcamera(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
  
   let base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
  
  });
  }
  
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || ' ').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
  getErrorMessage() {
    return this.email.hasError('required') ? 'Please enter your email' :
        this.email.hasError('email') ? 'Not a valid email' : '';
           
  }

  async onPincodeChange(){

    let pincode = this.delerform.get('bill_code').value;

    if(pincode.length >= 6){
    console.log(pincode);
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    this.http.get('https://api.postalpincode.in/pincode/'+ pincode).subscribe((data:any) => {
      loader.dismiss();
      console.log('resu', data);
    if(data[0].Status == "Success"){
     this.pinerror ="";
     
      let address = data[0].PostOffice[0];
      this.delerform.patchValue({
       // bill_city: address.Division,
        taluk: address.Block,
        district: address.District,
        bill_state: address.State,
      });
    }
    else{
      this.pinerror ="Pincode is invalid";
      console.log(this.pinerror);
      this.delerform.patchValue({
        //bill_city: '',
        taluk: '',
        district: '',
        bill_state:'',
      });

    }
   
      })
    }

  

  }

  async onPostalcodeChange(){

    let pincode = this.vendorform.get('postalcode').value;

    if(pincode.length >= 6){
    console.log(pincode);
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    this.http.get('https://api.postalpincode.in/pincode/'+ pincode).subscribe((data:any) => {
      loader.dismiss();
      console.log('resu', data);
    if(data[0].Status == "Success"){
     this.pinerror ="";
     
      let address = data[0].PostOffice[0];
      this.vendorform.patchValue({
        taluk: address.Block,
        district: address.District,
        state: address.State,
      });
    }
    else{
      this.pinerror ="Pincode is invalid";
      console.log(this.pinerror);
      this.vendorform.patchValue({
        taluk: '',
        district: '',
        state:'',
      });

    }
   
      })
    }

  

  }

  public createdeler = (delerFormValue) => {
    if (this.delerform.valid) {
      this.submitdealer();
    }
  }

  public createvendor = (vendorFormValue) => {
    if (this.vendorform.valid) {
      this.submitvendor();
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
 } 
 
  passFormControl = new FormControl('', [
    Validators.required, Validators.minLength(4) 
]);

panFormControl = new FormControl('', [Validators.required, Validators.pattern('^([A-Z]){5}([0-9]){4}([A-Z]){1}?$')]);
gstFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]);

phoneFormControl=  new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9 ]*')]);
 


     hide =true;
  
     async forgotPass() {
    
      // message: 'Enter you email address to send a reset link password.',
      /*  const { value: email } = await swal.fire({
         title: 'Forgot Password?',
         text: 'Enter your email address to send a reset link password.',
         showCancelButton: true,
         input: 'email',
         inputPlaceholder: 'Enter your email'
       })
       
       if (email) {
         let url = environment.baseurl;
         var formdata = new FormData();
         formdata.append('_operation','forgotPassword');
         formdata.append('username',this.user1.accountname);
         formdata.append('emailId',email);
         swal.fire(`Entered email: ${email}`)
       } */
 
 
       const { value: formValues } = await swal.fire({
         title: 'Forgot Password?',
         text: 'Enter your email address to send a reset link password.',
         html:
           '<span id="error_msg" style="color:red;"></span><input type="text" id="username" class="swal2-input" name="username" placeholder="Enter your username"><span id="u_msg" style="color:red;"></span>' +
           '<input type="email" id="email" class="swal2-input" name="email" placeholder="Enter your email or phone number"><span id="e_msg" style="color:red;"></span>',
         focusConfirm: false,
         showCancelButton: true,
         confirmButtonColor: "#0a5d00",   
         preConfirm: () => {
          let username = (<HTMLInputElement>document.getElementById('username')).value;
          let email = (<HTMLInputElement>document.getElementById('email')).value;
 
          document.getElementById("u_msg").innerHTML = "";
          document.getElementById("e_msg").innerHTML = "";
          if(username == ''){
           document.getElementById("u_msg").innerHTML = "Username required!";
           return false;
 
          }

          if(email == ''){
            document.getElementById("e_msg").innerHTML = "Email Id or Phone number is required!";
            return false;
  
           }
  
          //   if(this.IsEmail(email)==false ){
          //   document.getElementById("e_msg").innerHTML = "Email id is invalid<!";
          //   return false;
  
          //  }



 
      // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      // if(email.match(phoneno)) 
      //       {
      //         document.getElementById("e_msg").innerHTML = "phone number valid";
      //         return false;
      //       }
         
  
 
    //  if (email.match(phoneno) != email.match(phoneno)  )
    // {
    //   document.getElementById("e_msg").innerHTML = "phone number invalid";
    //   return false;
    // }

    
         

    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailReg.test(email))
      {
        console.log("email")
        
    
        let url = environment.baseurl;
        var formdata = new FormData();
        formdata.append('_operation','forgotPassword');
        formdata.append('username',username);
        formdata.append('emailId',email);
    
    
     
        this.loading =  this.loaderPresent();
    
        this.http.post( url,formdata,{})
        .toPromise()
        .then(response => {
          console.log(response);
          if (this.loading) {
            this.loadingCtrl.dismiss();
            this.loading=false;
          }
          this.data = response;
         // alert(this.data.result.result);
    
          if (this.data.result.result == true) { 
            let emailuid = this.data.result.uid
           // swal.fire(this.data.result.message);
           // this.toastService.presentToast(this.data.result.message);
            this.resetPass(emailuid);
            // this.resetPassMobile();
        
          }else{
          swal.fire(this.data.result.message)
            //document.getElementById("error_msg").innerHTML = this.data.result.message;
           return false;
            //
    
          //  swal.fire(JSON.stringify('Something Wrong'))
    
          //  this.toastService.presentToast('Something Wrong');
          }
        })
        .catch(console.log);
      } 
      else {
       
     var mobileRegex = /^\d{10}$/;
      if(email.match(mobileRegex))
      {
        console.log("phone")
        // document.getElementById("e_msg").innerHTML = "Phone valid<!";
        // return false;
    
        
        let url = environment.baseurl;
        var formdata = new FormData();
        formdata.append('_operation','forgotPasswordMobileNumber');
        formdata.append('username',username);
        formdata.append('phone',email);
    
    
     
        this.loading =  this.loaderPresent();
    
        this.http.post( url,formdata,{})
        .toPromise()
        .then(response => {
          console.log(response);
          if (this.loading) {
            this.loadingCtrl.dismiss();
            this.loading=false;
          }
          this.data = response;
       
         // alert(this.data.result.result);
    
          if (this.data.result.uid == this.data.result.uid) { 
              let otpuid = this.data.result.uid
              console.log("otpuidold",otpuid)
           // swal.fire(this.data.result.message);
           // this.toastService.presentToast(this.data.result.message);
            this.resetPassMobile(otpuid);
            // this.resetPass();
        
          }else{
          swal.fire(this.data.result.message)
            //document.getElementById("error_msg").innerHTML = this.data.result.message;
           return false;
            //
    
          //  swal.fire(JSON.stringify('Something Wrong'))
    
          //  this.toastService.presentToast('Something Wrong');
          }
        })
        .catch(console.log);
    
    
      }
    
    }

        
          
          /*  return [
             (<HTMLInputElement>document.getElementById('username')).value,
             (<HTMLInputElement>document.getElementById('email')).value,
           
           ] */
        
         }
       })
       
       if (formValues) {
         console.log('formValues', formValues[0]);
         console.log('formValues1', formValues[1]);
 
       
       }
   }
 
    IsEmail(email) {
     var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     if(!regex.test(email)) {
       return false;
     }else{
       return true;
     }
   }
   async resetPass(emailuid) {
       const { value: formValues } = await swal.fire({
        title: 'Reset Password',
        text: 'OTP has sent to registered email. Please enter otp below.',
        html:
          '<h4>OTP has sent to registered email. Please enter otp below.</h4><input type="text" id="otp" class="swal2-input" name="otp" placeholder="Enter OTP"><span id="o_msg" style="color:red;"></span> <input id="newPassword" type="password" class="swal2-input" name="newPassword" placeholder="Enter New Password"><span id="p_msg" style="color:red;"></span><input id="confirmPassword" type="password" class="swal2-input" name="confirmPassword" placeholder="Re-Enter Password"><span id="rp_msg" style="color:red;"></span>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: "#0a5d00",   

        preConfirm: () => {
         let otp = (<HTMLInputElement>document.getElementById('otp')).value;
          let newPassword = (<HTMLInputElement>document.getElementById('newPassword')).value;
          let confirmPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value;
 
          document.getElementById("o_msg").innerHTML = "";
          document.getElementById("p_msg").innerHTML = "";
          document.getElementById("rp_msg").innerHTML = "";
          if(otp == ''){
           document.getElementById("o_msg").innerHTML = "OTP is required!";
           return false;
 
          }
 
          if(newPassword == ''){
           document.getElementById("p_msg").innerHTML = "Password is required!";
           return false;
 
          }
 
          if(confirmPassword == ''){
           document.getElementById("rp_msg").innerHTML = "Confirm Password is required!";
           return false;
 
          }
 
          if(newPassword != confirmPassword){
           document.getElementById("rp_msg").innerHTML = "Passwords does not match!";
           return false;
 
          }
         let url = environment.baseurl;
         var formdata = new FormData();
         formdata.append('_operation','forgotPasswordReset');
         formdata.append('otp',otp);
         formdata.append('uid',emailuid);
         formdata.append('newPassword',newPassword);
         formdata.append('repeatnewPassword',confirmPassword);
      
         this.loading =  this.loaderPresent();
 
         this.http.post( url,formdata,{})
         .toPromise()
         .then(response => {
           console.log(response);
           if (this.loading) {
             this.loadingCtrl.dismiss();
             this.loading=false;
           }
           this.data = response;
          // alert(this.data.result.result);
 
           if (this.data.result.result == true) { 
 
             swal.fire(this.data.result.message);
            // this.toastService.presentToast(this.data.result.message);
            // this.resetPass();
            
         
           }else{
           swal.fire(this.data.result.message)
             //document.getElementById("error_msg").innerHTML = this.data.result.message;
            return false;
             //
 
           //  swal.fire(JSON.stringify('Something Wrong'))
 
           //  this.toastService.presentToast('Something Wrong');
           }
         })
         .catch(console.log);
          
          
        }
      })
      
      if (formValues) {
        
      } 
  }
  
  async resetPassMobile(uid) {
    console.log("otpuid",uid)
    const { value: formValues } = await swal.fire({
     title: 'Reset Password',
     text: 'OTP has sent to registered email. Please enter otp below.',
     html:
       '<h4>OTP has sent to registered email. Please enter otp below.</h4><input type="text" id="otp" class="swal2-input" name="otp" placeholder="Enter OTP"><span id="o_msg" style="color:red;"></span> <input id="newPassword" type="password" class="swal2-input" name="newPassword" placeholder="Enter New Password"><span id="p_msg" style="color:red;"></span><input id="confirmPassword" type="password" class="swal2-input" name="confirmPassword" placeholder="Re-Enter Password"><span id="rp_msg" style="color:red;"></span>',
     focusConfirm: false,
     showCancelButton: true,
     confirmButtonColor: "#0a5d00",   

     preConfirm: () => {
      let otp = (<HTMLInputElement>document.getElementById('otp')).value;
       let newPassword = (<HTMLInputElement>document.getElementById('newPassword')).value;
       let confirmPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value;

       document.getElementById("o_msg").innerHTML = "";
       document.getElementById("p_msg").innerHTML = "";
       document.getElementById("rp_msg").innerHTML = "";
       if(otp == ''){
        document.getElementById("o_msg").innerHTML = "OTP is required!";
        return false;

       }

       if(newPassword == ''){
        document.getElementById("p_msg").innerHTML = "Password is required!";
        return false;

       }

       if(confirmPassword == ''){
        document.getElementById("rp_msg").innerHTML = "Confirm Password is required!";
        return false;

       }

       if(newPassword != confirmPassword){
        document.getElementById("rp_msg").innerHTML = "Passwords does not match!";
        return false;

       }
      let url = environment.baseurl;
      var formdata = new FormData();
      formdata.append('_operation','forgotPasswordResetMobileNumber');
      formdata.append('otp',otp);
      formdata.append('uid',uid);
      formdata.append('newPassword',newPassword);
      formdata.append('repeatnewPassword',confirmPassword);
   
      this.loading =  this.loaderPresent();

      this.http.post( url,formdata,{})
      .toPromise()
      .then(response => {
        console.log(response);
        if (this.loading) {
          this.loadingCtrl.dismiss();
          this.loading=false;
        }
        this.data = response;
       alert(this.data.result);

        if (this.data.result.result == true) { 
          var obj = this.data.result
          for(var a in obj) { 
            if(a== 'message') {
               var b = obj[a];
               console.log("b is",  b);
               swal.fire(b);
            }
         }

          // swal.fire(this.data.result.message);
         // this.toastService.presentToast(this.data.result.message);
         // this.resetPass();
         
      
        }else{
        swal.fire(this.data.result.message)
          //document.getElementById("error_msg").innerHTML = this.data.result.message;
         return false;
          //

        //  swal.fire(JSON.stringify('Something Wrong'))

        //  this.toastService.presentToast('Something Wrong');
        }
      })
      .catch(console.log);
       
       
     }
   })
   
   if (formValues) {
     
   } 
}
 
  changeGst(event): void {

    //console.log(event);
   
  if (event.target.files.length > 0) {
   // console.log(<File>event.target.files[0].type );
    this.myfile = <File>event.target.files[0];
    this.image_type = <File>event.target.files[0].type; 
    
   if( this.image_type =='image/jpg' || this.image_type =='image/jpeg' || this.image_type == 'application/pdf'){
    /* let reader = new FileReader();
            reader.readAsDataURL(this.profile);
            reader.onload = (e: any) => {
              this.userInfo.imagename =e.target.result;
            } */
          }else{
            this.delerform.setErrors({ 'invalid': true });

            this.toastService.presentToast('Invalid file type');
          }
  }
  //}
    }

    changeVcard(event): void {

      //console.log(event);
     
    if (event.target.files.length > 0) {
     // console.log(<File>event.target.files[0].type );
      this.myfile1 = <File>event.target.files[0];
      this.image_type = <File>event.target.files[0].type; 
      
     if( this.image_type =='image/jpg' || this.image_type =='image/jpeg' || this.image_type == 'application/pdf'){
      /* let reader = new FileReader();
              reader.readAsDataURL(this.profile);
              reader.onload = (e: any) => {
                this.userInfo.imagename =e.target.result;
              } */
            }else{
              this.delerform.setErrors({ 'invalid': true });
              this.toastService.presentToast('Invalid file type');
            }
     
    }
    //}
      }  
 async submitdealer() {

    // const params = new URLSearchParams(
    //   this.user1
    // );
    // const data=(params.toString());

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();

    let url = environment.signupurl
    /* let photo = (<HTMLInputElement>document.getElementById('myfile')).files[0];
    let photo1 = (<HTMLInputElement>document.getElementById('myfile1')).files[0]; */
  
    var formdata = new FormData();
    
    formdata.append('file_1_1',this.myfile);
    formdata.append('file_1_2',this.myfile1);

    formdata.append('_operation','loginAndFetchModules');
    formdata.append('accountname',this.user1.accountname);
    //formdata.append('cf_885',this.user1.cf_885);
    formdata.append('cf_891',this.user1.cf_891);
    formdata.append('cf_893',this.user1.cf_893);
    formdata.append('cf_895',this.user1.cf_895);
    formdata.append('cf_887',this.user1.cf_887);
    formdata.append('phone',this.user1.phone);
    formdata.append('email1',this.user1.email1);
    formdata.append('cf_889',this.user1.cf_889);
    formdata.append('cf_873',this.user1.cf_873);
    formdata.append('bill_street',this.user1.bill_street);
    formdata.append('shopno',this.user1.shopno);
    formdata.append('landmark',this.user1.landmark);
    formdata.append('bill_code',this.user1.bill_code);
    formdata.append('bill_city',this.user1.bill_city);
    formdata.append('taluk',this.user1.taluk.toLocaleUpperCase());
    formdata.append('district',this.user1.district.toLocaleUpperCase());
    formdata.append('bill_state',this.user1.bill_state.toLocaleUpperCase());

this.delerform.patchValue({
  cf_895: '',
  
 });

    formdata.append('publicid','512d3a435929400d01b2f59431d6e42d');
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();

      console.log(response);

      this.data = response;
      if (this.data.success == true) { 

        this.toastService.presentToast('User registerd successfully.');
      this.delerform.reset();
  this.segment = 0;
     //   this.navCtrl.navigateRoot('/login');

    
      }else{
        this.toastService.presentToast(this.data.error.message);
      }
    })
    .catch(console.log);
  }

  changeGst1(event): void {

    //console.log(event);
   
  if (event.target.files.length > 0) {
   // console.log(<File>event.target.files[0].type );
    this.myfile2 = <File>event.target.files[0];
    this.image_type = <File>event.target.files[0].type; 
    
   if( this.image_type =='image/jpg' || this.image_type =='image/jpeg' || this.image_type == 'application/pdf'){
    /* let reader = new FileReader();
            reader.readAsDataURL(this.profile);
            reader.onload = (e: any) => {
              this.userInfo.imagename =e.target.result;
            } */
          }else{
            this.vendorform.setErrors({ 'invalid': true });
            this.toastService.presentToast('Invalid file type');
          }
   
  }
  //}
    }

    changeVcard1(event): void {

      //console.log(event);
     
    if (event.target.files.length > 0) {
     // console.log(<File>event.target.files[0].type );
      this.myfile3 = <File>event.target.files[0];
      this.image_type = <File>event.target.files[0].type; 
      
     if(this.image_type =='image/jpg' || this.image_type =='image/jpeg' || this.image_type == 'application/pdf'){
      /* let reader = new FileReader();
              reader.readAsDataURL(this.profile);
              reader.onload = (e: any) => {
                this.userInfo.imagename =e.target.result;
              } */
            }else{
              this.vendorform.setErrors({ 'invalid': true });

              this.toastService.presentToast('Invalid file type');
            }
     
    }
    //}
      }  

  async submitvendor() {

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    let url = environment.signupurl 
    /* let photo2 = (<HTMLInputElement>document.getElementById('myfile2')).files[0];
    let photo3 = (<HTMLInputElement>document.getElementById('myfile3')).files[0]; */
    var formdata = new FormData();

    formdata.append('file_2_1',this.myfile2);
    formdata.append('file_2_2',this.myfile3);

    formdata.append('_operation','loginAndFetchModules');
    formdata.append('vendorname',this.user.vendorname);
    //formdata.append('cf_875',this.user.cf_875);
    formdata.append('cf_877',this.user.cf_877);
    formdata.append('cf_897',this.user.cf_897);
    formdata.append('cf_899',this.user.cf_899);
    formdata.append('cf_879',this.user.cf_879);
    formdata.append('street',this.user.street);
    formdata.append('phone',this.user.phone);
    formdata.append('email',this.user.email);
    formdata.append('cf_881',this.user.cf_881);
    formdata.append('cf_883',this.user.cf_883);
    formdata.append('publicid','0fb102811b5b31e284a3762b4b2f918c');
    formdata.append('shopno',this.user.shopno);
    formdata.append('landmark',this.user.landmark);
    formdata.append('postalcode',this.user.postalcode);
    formdata.append('city',this.user.city);
    formdata.append('taluk',this.user.taluk.toLocaleUpperCase());
    formdata.append('district',this.user.district.toLocaleUpperCase());
    formdata.append('state',this.user.state.toLocaleUpperCase());

    
this.vendorform.patchValue({
  cf_899: '',
  
 });
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();

      console.log(response);
      this.data = response;
      if (this.data.success == true) { 

        this.toastService.presentToast('User registerd successfully.');
        this.vendorform.reset();
        this.segment = 0;

     // this.navCtrl.navigateRoot('/login');
    
      }else{
        this.toastService.presentToast(this.data.error.message);
      }
    })
    .catch(console.log);
  }
  

  login() {
    let url = environment.baseurl
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    formdata.append('_operation','loginAndFetchModules');
    formdata.append('username',this.userlog.username);
    formdata.append('password',this.userlog.password);

    this.loading =  this.loaderPresent();

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.loadingCtrl.dismiss();

      this.data = response;
     
      // localStorage.setItem('userdata', this.data);

      console.log(this.data.success);
      if(this.data.success == true ){

      if (this.data.result.login.isVerifiedUser == true) { 

        this.toastService.presentToast('Login Successful');
        localStorage.setItem('logindata', JSON.stringify(this.data.result.login.userdetails));
        localStorage.setItem('userid', this.data.result.login.userid);
        localStorage.setItem('roleid', this.data.result.login.userdetails.roleid);
        localStorage.setItem('rolename', this.data.result.login.userdetails.rolename);
        localStorage.setItem('session', this.data.result.login.session);
        this.cartService.getCartItemCount();
        this.router.navigate(['/home'])

       // this.navCtrl.navigateRoot('/home');
    
      }else{

       /* this.toastService.presentToast('Something Wrong');
      this.navCtrl.navigateRoot('/verification'); */

      this.showVerificationAlert();

      }
    } else{
      this.error = this.data.error.message;
      this.toastService.presentToast(this.data.error.message);
    }
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
  
  public async loaderPresent(): Promise<any> {

    const loading = await this.loadingCtrl.create({
      cssClass: "my-custom-loader-class",
      message: "Please wait ...",
      backdropDismiss: true
    });

    await loading.present();

   return loading;
}
 }
