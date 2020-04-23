import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Url} from '../models/Url.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) {
  }
  url = 'http://localhost:3000/url';

  getTinyUrl(newUrl: string):Observable<Url>{
    return this.http.post<Url>(this.url,{long_url:newUrl});
  }
}
