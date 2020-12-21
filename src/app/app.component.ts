import { Component, OnInit } from '@angular/core';

const BASE_URL = "https://angular-jumio-web.herokuapp.com";
const HEADERS = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization' : 'M2I5MjUxZmQtODBiNi00OGY5LTk4NGUtNjdmNzJmOTMwZDcwOmpYQXN5MFc0aGFIMkNqSDJRMWpZQloxNDVmVVJtanJQ',
  'User-Agent' : 'MyCompany jumioWebTest/v0.1'
}
const FR_RETRIEVAL_URL = "http://www.pnmb.com.my/KopTenCoreAPI/api/KopTen/GetFRImage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'jumio-web-test';
  imageFace : string = null;
  imageCardFront : string = null;
  imageCardBack : string = null;
  transactionReference : string = null;
  items = [];

  constructor(){

  }

  ngOnInit(){
    this.loadWebJumioWebSDK();
  }

  loadWebJumioWebSDK = async() => {
    try{
      const response = await fetch('https://netverify.com/api/v4/initiate',
      {
        method : 'POST',
        body : JSON.stringify({
          customerInternalReference : "pannirselvam",
          userReference : "pannir",
          workflowId : 200,
          successUrl : `${BASE_URL}/success-page`,
          errorUrl : `${BASE_URL}/error-page`,
        }),
        headers : HEADERS
      }
      );
      const json = await response.json();
      if(json === undefined) alert('An error occurred. Please try again later');
      window.open(json.redirectUrl, '_self');
      this.transactionReference = json.transactionReference;
      this.loadFetch();

    } catch(e){
      console.log('here is an error');
      console.log(e);
    }
  }

  loadFetch = async() => {
    const response = await fetch(`${FR_RETRIEVAL_URL}?scanID=${this.transactionReference}`,
    {
      method : 'GET',
      headers : HEADERS
    })
    const json = await response.json();

    if(json.hasOwnProperty('images') || json['images'].length > 0) this.loadImages(json);
    else this.periodicLoadingTheImages();
  }

  periodicLoadingTheImages = () => {
    setTimeout(() => {
      this.loadFetch();
    }, 5000);
  }

  loadImages = async(json) => {
    const images = json['images'];
    let store_data = [];
    let index = 0;
    for(let image of images){        
        const data = {id : index, imageURL : image.href, type : image.classifier, label : "PASS"};
        store_data.push(data);
        index++;
    }
    this.items = store_data;
  }

}
