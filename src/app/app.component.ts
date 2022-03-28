import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import {
  NavController,
  MenuController,
  ToastController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { AuthService } from "./auth.service";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { AppUpdate } from "@ionic-native/app-update/ngx";
import { CartService } from "./cart.service";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Market } from "@ionic-native/market/ngx";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "../environments/environment";
// import { EmailComposer } from "@awesome-cordova-plugins/email-composer/ngx";
// import { Device } from '@awesome-cordova-plugins/device/ngx';

declare var IRoot: any;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  userdata: any;
  userlogin = 0;
  roleId: any;
  public selectedIndex = 0;
  cplatform = "android";

  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home-outline",
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },

    // {
    //   title: 'Men',
    //   url: '/shirt',
    //   direct: 'forward',
    //   icon: 'man'
    // },
    // {
    //   title: 'Login',
    //   url: '/signup',
    //   direct: 'forward',
    //   icon: 'person-add'
    // },
    {
      title: "Order History",
      url: "/order",

      icon: "calendar-outline",
    },
    {
      title: "Customer Support",
      url: "/contactus",
      icon: "chatbubbles-outline",
    },
    {
      title: "Justo Policy",
      url: "/justopolicy",
      icon: "alert-circle-outline",
    },
    // {
    //   title: 'Support Ticket',
    //   url: '/support',
    //   icon: 'help-circle-outline'
    // },

    // {
    //   title: 'Account',
    //   url: '/account',

    //   icon: 'person'

    // }
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  PackageName: "com.app.justo";
  UniqueDeviceID: string;
  countrycode: string = "91";
  whatsappnumber: string = "8050010030";
  url: string =
    "https://wa.me/" + this.countrycode + this.whatsappnumber + "?text=Thanks for connecting JustO...";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private router: Router,
    private _location: Location,
    public alertController: AlertController,
    private authService: AuthService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private cartService: CartService,
    private appUpdate: AppUpdate,
    private appVersion: AppVersion,
    private market: Market,
    private http: HttpClient,
    // private emailComposer: EmailComposer
  ) {
    this.initializeApp();

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        /*  if(this.VersionNumber != this.Versionlive){
          this.alertUpdate();
        }*/
        // Show loading indicator
        //  console.log('NavigationStart', event);
        //   var myobj = document.getElementsByClassName("tooltip");
        this.localdata();
        // myobj.remove();
        //console.log(myobj);
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        //  console.log('NavigationEnd', event);
      }
    });
  }

  /* ionViewWillEnter(){
    this.appVersion.getVersionCode().then(value => {
      //this.appVersion.getVersionNumber().then(value => {
        console.log('getVersionCode',value);
        if(value < 2){
         this.alertUpdate();
        }
        }).catch(err => {
        //alert(err);
      });
  }
 */

  sendemail(){
    let email = {
      to: 'info@justo4u.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }
    
    // Send a text message using default options
    // this.emailComposer.open(email);
  }
  initializeApp() {
    // push notification
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // end push notification

    this.platform.ready().then(() => {
      this.splashScreen.hide();

      this.statusBar.styleBlackOpaque();

      //console.log(this.authService.checkUser());
      /*   if (!this.authService.getToken()) {
        this.router.navigate(["signup"]);
        console.log('app-component', 'signup');
      } else {
        this.router.navigate(["home"]);
        console.log('app-component','home');
      } */
      if (this.platform.is("ios")) {
        this.cplatform = "ios";
      }

      let url = environment.baseurl;

      var formdata = new FormData();
      formdata.append("_operation", "getAppVersion");

      formdata.append("platform", this.cplatform);

      this.http
        .post(url, formdata, {})
        .toPromise()
        .then((response: any) => {
          if (response.success == true) {
            let version = response.result.versioncode;

            this.appVersion
              .getVersionCode()
              .then((value) => {
                //this.appVersion.getVersionNumber().then(value => {

                if (value < version) {
                  this.alertUpdate();
                }
              })
              .catch((err) => {
                //alert(err);
              });
          }
          console.log("response", response);
          // return this.topdata1;
        })
        .catch(console.log);

      if (typeof IRoot !== "undefined" && IRoot) {
        IRoot.isRooted(
          (data) => {
            if (data && data == 1) {
              console.log("This is routed device");

              this.showRootAlert();
            } else {
              console.log("This is not routed device");
            }
          },
          (data) => {
            console.log("routed device detection failed case", data);
          }
        );
      }
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log("Back press handler!");
      if (this._location.isCurrentPathEqualTo("/home")) {
        // Show Exit Alert!
        console.log("Show Exit Alert!");
        this.showExitConfirm();
        processNextHandler();
      } else {
        // Navigate to back page
        console.log("Navigate to back page");
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log("Handler called to force close!");
      this.alertController
        .getTop()
        .then((r) => {
          if (r) {
            navigator["app"].exitApp();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  alertUpdate() {
    this.alertController
      .create({
        cssClass: "my-custom-class",
        header: "New Update",
        subHeader: "",
        message: "The App need to Update",
        backdropDismiss: false,
        buttons: [
          {
            text: "Update",
            handler: (blah) => {
              this.appVersion
                .getPackageName()
                .then((value) => {
                  console.log("packagename", value);
                  this.market.open(value);
                })
                .catch((err) => {
                  //alert(err);
                });
              navigator["app"].exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  showExitConfirm() {
    this.alertController
      .create({
        header: "App termination",
        message: "Do you want to close the app?",
        backdropDismiss: false,
        buttons: [
          {
            text: "Stay",
            role: "cancel",
            handler: () => {
              console.log("Application exit prevented!");
            },
          },
          {
            text: "Exit",
            handler: () => {
              navigator["app"].exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }

    this.localdata();
    // this.cartService.getCartItemCount();
  }
  showRootAlert() {
    this.alertController
      .create({
        header: "App termination",
        message: "You can not use this app in rooted device",
        backdropDismiss: false,
        buttons: [
          {
            text: "Exit",
            handler: () => {
              navigator["app"].exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
  localdata() {
    const loginData = JSON.parse(localStorage.getItem("logindata"));
    this.userdata = loginData;
    if (this.userdata != null) {
      this.userlogin = 1;
      this.roleId = localStorage.getItem("roleid");
    }
    return this.userdata;
  }

  logout() {
    this.authService.logout();
    this.userlogin = 0;

    this.navCtrl.navigateRoot("/signup");
  }

  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        (err) => {
          alert(err);
        }
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            (error) => {
              //Show alert if user click on 'No Thanks'
              alert(
                "requestPermission Error requesting location permissions " +
                  error
              );
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          // this.getLocationCoordinates()
          this.navCtrl.navigateRoot("/visit");
        },
        (error) =>
          alert(
            "Error requesting location permissions " + JSON.stringify(error)
          )
      );
  }
}
