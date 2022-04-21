import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
@Component({
  selector: 'app-outstanding',
  templateUrl: './outstanding.page.html',
  styleUrls: ['./outstanding.page.scss'],
})
export class OutstandingPage implements OnInit {

  data: any;
    constructor(
      private http: HttpClient,
    ) { }

  ngOnInit() {
    this.outstandinglist()
  }

  outstandinglist() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','oustanding');
    formdata.append('_session',session);
    formdata.append('invoicevalue',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
    })
    .catch(console.log);


  } 



}
