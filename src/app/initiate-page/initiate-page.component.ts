import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiate-page',
  templateUrl: './initiate-page.component.html',
  styleUrls: ['./initiate-page.component.css']
})
export class InitiatePageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.loadWebJumioWebSDK();
  }

  loadWebJumioWebSDK = async() => {
    try{
      const response = await fetch('/api/initiate-jumio-web',
      {
        method : 'GET'
      }
      );
      const json = await response.json();
      if(json === undefined) alert('An error occurred. Please try again later');
      window.open(json.redirectUrl, '_self');
      localStorage.setItem('scanReference', json.transactionReference);
    } catch(e){
      console.log('here is an error');
      console.log(e);
    }
  }

}
