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
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  items = [];
  scanReference : string = null;

  constructor() {
    this.scanReference = localStorage.getItem('scanReference');
   }

  ngOnInit(): void {
    this.loadFetch();
    // this.loadFetchDummy();
  }


  loadFetchDummy = async() => {
    const json = {images : [{index : 1, href : "https://wallpaperaccess.com/full/95154.jpg", classifier : "Front"}, {index : 2, href : "https://i.pinimg.com/originals/37/6e/4e/376e4e0dab8e566bf85992ceedeb0ade.jpg", classifier : "Back"}]};
    if(json.hasOwnProperty('images') || json['images'].length > 0) this.loadImages(json);
    else this.periodicLoadingTheImages();
  }


  loadFetch = async() => {
    const response = await fetch(`${FR_RETRIEVAL_URL}?scanID=${this.scanReference}`,
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
