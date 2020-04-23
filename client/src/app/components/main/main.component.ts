import { Component, OnInit } from '@angular/core';
import {UrlService} from '../../services/url.service';
import {Url} from '../../models/Url.model';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private urlService :UrlService) { }
  url:string = '';
  err:any
  urlObject:Url = {};
  hrefBase = 'http://localhost:3000/';
  ngOnInit() {
  }
  sendUrl(){
    try {
      let originalUrl = new URL(this.url);
    } catch (err) {
      this.err = {error:'INVALID URL'};
      return;
    }
    this.urlService.getTinyUrl(this.url).subscribe((res:any)=>{
      this.urlObject = res.url;
      this.err = {};
    },
    (err)=>{
      debugger;
      this.err = err});
  }

}
