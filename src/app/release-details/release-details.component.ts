import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../services/service.service'

@Component({
  selector: 'app-release-details',
  templateUrl: './release-details.component.html',
  styleUrls: ['./release-details.component.scss']
})
export class ReleaseDetailsComponent implements OnInit {
  ATTACHMENTS=[];
  myparam:number;
  newsDetails:any;
  constructor(private _ActivatedRoute:ActivatedRoute,private _ServiceService:ServiceService) { }
  ngOnInit() {
    this._ActivatedRoute.params.subscribe((params) => this.myparam = params['id']);
    this._ServiceService.getData().subscribe(data => {this.newsDetails = data.articles[this.myparam]}) 
    this.ATTACHMENTS.length=5;
  }
  interested = [
    { photo: '../../assets/images/4.png', title: 'About MRMI', description: 'Mohammed Bin Rashid Al Maktoum Global Initiatives was inaugurated on 4 October 2015. ' },
    { photo: '../../assets/images/news-2.png', title: 'Our Message', description: 'As a young Foundation, we are inspired by our young nation whose achievements have surpassed.' },
    { photo: '../../assets/images/5.png', title: 'Our Vision, Mission & Goals', description: 'VisionAl Jalila Foundation is a global philanthropic organisation.' },
  ]
}
