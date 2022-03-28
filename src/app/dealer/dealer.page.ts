import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, IonInfiniteScroll,
  IonContent,ActionSheetController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.page.html',
  styleUrls: ['./dealer.page.scss'],
})
export class DealerPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  dealers= [];
  data: any;
  page:any;
  filterid:any;
  Error_message: string = "";
  totalrecords: number = 0;
  scrollTopButton = false;
  limit = 10;
  disable = 0;
  applyFilter = false;
  value: string='';
  sortOrder = "ASC";
  sortArray = ["ASC", "DESC"];
  actionSheet: any;

  constructor(

    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private toastService: ToastService, 
    public actionSheetController: ActionSheetController,

  ) {


   }



  ngOnInit() {
    this.page =1;
    this.filterid =4;
    this.getDealers();
    
  }
  async getDealers(event?){

    if (this.page == 1) {
      this.dealers = [];
    }
    const loader = await this.loadingCtrl.create({
     // duration: 2000
    });
   if(this.applyFilter == false){
    loader.present();
  }
    let url = environment.baseurl
    // const loginData = JSON.parse(localStorage.getItem('logindata'));
    const session = localStorage.getItem('session');
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    formdata.append('_operation','listModuleRecords');
    formdata.append('_session',session);
    formdata.append('module', 'Accounts');
    formdata.append('page', this.page);
    formdata.append('filterid', this.filterid);
    formdata.append('searchAllFieldsValue', this.value);
    formdata.append('orderBy', 'accountname');
    formdata.append('sortOrder', this.sortOrder);
 
    /* let formdata = {
      _operation: 'listModuleRecords',
      _session: session,
      module: "Accounts",
      page: this.page, 
      searchAllFieldsValue:this.value      
    };
 */
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      if(this.applyFilter == false){
      loader.dismiss();
      }
      this.data = response;
     // this.dealers = this.data.result.records;
     console.log('de',this.data.result.records);
      if( this.data.result.records == null || this.data.result.records == 'null' || this.data.result.records == '') {

        this.Error_message = 'No any data found.';
        this.totalrecords=0;

      }else { 
          let pdata = this.data.result.records;

          if (this.page == 1) {
            this.dealers = new Array();
            this.scrollToTop();
           // this.infiniteScroll.disabled = false;
          }
          if (pdata.length != 0) {

            for (let value of pdata) {
              this.dealers.push(value);
            }
            if (event) {
              event.target.complete();
            }
          } else {
            if (event) {
              event.target.disabled = true;
            }
          }

          if (pdata.length == 0 || pdata.length < this.limit) {
           // this.infiniteScroll.disabled = true;
            this.disable = 1;
          }else{
            this.disable = 0;
          }
        }
        this.page = this.page+1;

      console.log("dealers",this.dealers);
     
    })
    .catch(console.log);
  }

  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
  }

  resetFilters() {
    this.applyFilter = false;
    this.sortOrder = "ASC";
    this.value = "";
    this.page = 1;

    this.getDealers();
  }

  resetFilters_clear(ev: any) {
   
    let val = ev.target.value;
    if (val.length <= 0) {


      //this.infiniteScroll.disabled = false;
   //   console.log(this.infiniteScroll.disabled);
      this.resetFilters(); 
       }
   
  }

  applyFilters() {
    this.applyFilter = true;
    this.page = 1;
    this.scrollToTop();
    this.disable = 0;
    let val = this.value;
    if (val && val.length >= 2 && val.trim() !== '') {


      //this.infiniteScroll.disabled = false;
   //   console.log(this.infiniteScroll.disabled);
      this.getDealers(); 
       }else{
         this.resetFilters();
       }
   
  }

  getSortDelear(value) {
    this.sortOrder = value;
    this.applyFilter = true;
    this.page = 1;
    this.scrollToTop();

   // this.disable = 0;
    this.getDealers();
  }

  async presentActionSheet() {
    this.actionSheet = this.actionSheetController
      .create({
        header: "Sort By",
        cssClass: "action",
        buttons: [
          {
            text: "A to Z",
            icon: "arrow-down-circle-outline",
            handler: () =>{
              this.getSortDelear("ASC");
            }
          },
          {
            text: "Z to A",
            icon: "arrow-up-circle-outline",
            handler: () => {
              this.getSortDelear("DESC");
            }
          },
        
        ]
      })
      .then(actionsheet => {
        actionsheet.present();
      });
  }

 

  scrollToTop() {
    this.content.scrollToTop(0);
    this.scrollTopButton = false;
  }
}
