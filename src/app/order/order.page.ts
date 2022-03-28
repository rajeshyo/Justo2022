import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, IonInfiniteScroll,
  IonContent,MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { Downloader,DownloadRequest  } from '@ionic-native/downloader/ngx';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  roleId = localStorage.getItem('roleid');
  data: any;
  topdata1=[]
  orderlistdata=[]
  orderid:any
  page:any;
  filterid:any;
  Error_message: string = "";
  totalrecords: number = 0;
  scrollTopButton = false;
  limit:any;
  disable = 0;
  constructor(public navCtrl: NavController,
    public cartService: CartService,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private toastService: ToastService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activatedRouter:ActivatedRoute,
    private http: HttpClient,
    private downloader: Downloader

  ) { }

  ngOnInit() {
    this.page =1;
    this.limit =10;
    this.orderlist(false,'')
  }
  public download(url:any,filename) {
    var request: DownloadRequest = {

      uri: url,
      title: 'MyDownload',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility:1,
      destinationInExternalPublicDir: {
          dirType: 'Downloads',
          subPath: filename+'_invoice.pdf'
      }
  };

  this.downloader.download(request)
  .then((location: string) => console.log('File downloaded at:'+location))
  .catch((error: any) => console.error(error));

  }

  async orderlist(isFirstLoad?,event?){

    if (this.page == 1) {
      this.orderlistdata = [];
    }
    const loader = await this.loadingCtrl.create({
     // duration: 2000
    });
  
    loader.present();
  
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');
  
    var formdata = new FormData();
    formdata.append('_operation','getOrderListing');
    formdata.append('_session',session);
    formdata.append('userId',userid);
    formdata.append('maxEntries',this.limit);
    formdata.append('page',this.page);
    // formdata.append('values',"this.cart");
   
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();
      this.data = response;
      for (let i = 0; i <  this.data.result.orders.length; i++) {
        this.orderlistdata.push( this.data.result.orders[i]);
      }
      if(this.orderlistdata.length <=  0){
        this.Error_message = 'No any data found.'

      }

      if (isFirstLoad)
        event.target.complete();

      this.page++;
    
     

      console.log("orderlistdata",this.orderlistdata);

     
  
    })
    .catch(console.log);
  }

  doInfinite(event) {
    this.orderlist(true, event);
  }
  
  reorder(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','reOrder');
    formdata.append('_session',session);
    formdata.append('orderId',id);
    formdata.append('userId',userid);
    formdata.append('qty',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.cartService.getCartItemCount();

      this.navCtrl.navigateRoot('/cart');

    })
    .catch(console.log);


  } 
  cancelorder(id){
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');
  
    var formdata = new FormData();
    formdata.append('_operation','cancelOrder');
    formdata.append('_session',session);
    
    formdata.append('userId',userid);
    formdata.append('sostatus',"Cancelled");
    formdata.append('module', 'SalesOrder');
    formdata.append('action', 'SaveAjax');
    formdata.append('orderId', id );
   
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.orderlistdata =this.data.result.orders;
      this.orderlist();
      location.reload()
      this.toastService.presentToast('Cancel Sucessfull');
      console.log("orderlist",this.data.result.orders);
      // return this.topdata1;
  
    })
    .catch(console.log);
  }
}
