import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {ServiceService} from '../services/service.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    nav:true,
    navText: [`<div class="slider-arrow right">
    <div class="arrow next">
      <img src="../../assets/images/icons/next-arrow.svg" alt="next">
    </div>
  </div>`, `<div class="slider-arrow left">

  <div class="arrow prev">
    <img src="../../assets/images/icons/prev-arrow.svg" alt="prev">
  </div>
</div>`],
    responsive: {
      0: {
        items: 1
      }
    },
  }
  customOptions2: OwlOptions = {
    // items:2,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 2
      }
    },
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,

    dots: false,
    navSpeed: 700,
    lazyLoad: true,
    navText: [`<div class="slider-arrow">
    <div class="arrow next">
      <img src="../../assets/images/icons/next-arrow.svg" alt="next">
    </div>
  </div>`, `<div class="slider-arrow">

  <div class="arrow prev">
    <img src="../../assets/images/icons/prev-arrow.svg" alt="prev">
  </div>
</div>`],
  }
  
  container = {} as any;
  News=[];
  x:any
  // "2020-09-14T04:01:00Z"
  private subscriptions = new Subscription();
  constructor(public _ServiceService:ServiceService) {}
  ngOnInit() {
   this.getAll();
  }
  getAll(){
    this.subscriptions.add( this._ServiceService.getData().subscribe(e => {
      this.News=e.articles;  
      this.x=e.articles.publishedAt;
      this.News.splice(8);
      this.News.map(el => {
        const newFormat = new Date(el.publishedAt) + '';
        el.day = newFormat.split(' ')[2];
        el.month = el.publishedAt.split(/-|T/)[1];
        el.year = newFormat.split(' ')[3];
        el.month = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'][--el.month];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayFormat = new Date(el.publishedAt);
        el.dayName = days[dayFormat.getDay()];
      });

 }))
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
