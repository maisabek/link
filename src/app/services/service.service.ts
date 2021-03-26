import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {observable, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http:HttpClient) { }
  getData():Observable<any>{
    return this.http.get(`assets/newsapi.json`)
  }
 
}
