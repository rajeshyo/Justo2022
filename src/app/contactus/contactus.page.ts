import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  call() {
    setTimeout(()=>{
       window.open('tel:8050010030');
    },500);
  }

  mailto() {
    setTimeout(()=>{
       window.open('mailto:info@justo4u.COM');
    },500);
  }
  website() {
    setTimeout(()=>{
       window.open('https://www.justo4u.com/');
    },500);
  }
}
