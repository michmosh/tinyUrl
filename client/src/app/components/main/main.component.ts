import { Component, OnInit , ElementRef} from '@angular/core';
import {UrlService} from '../../services/url.service';
import {Url} from '../../models/Url.model';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private urlService :UrlService , private el : ElementRef) { }
  url:string = '';
  err:any
  urlObject:Url = {};
  showLoader :Boolean = false;
  hrefBase = 'http://localhost:3000/';
  ngOnInit() {
  }
  sendUrl(){
    try {
      let originalUrl = new URL(this.url);
    } catch (err) {
      this.err = {error:'INVALID URL'};
      return this.removeError();
    }
    this.showLoader = true;
    this.urlService.getTinyUrl(this.url).subscribe((res:any)=>{
      this.urlObject = res.url;
      this.err = {};
      this.showLoader = false;
    },
    (err)=>{
      this.err = err;
      this.showLoader = false;
      return this.removeError();
    });
  }
  removeError(){
    setTimeout(()=>{
      this.err = false
    },1000)
  }

  copyToClip(url){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
