import { Component, OnInit, OnDestroy } from '@angular/core';
import {ServiceService} from '../services/service.service'
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit, OnDestroy {

  News=[];
  categories=[];
  filterNews=[];
  category:any;
  title:any;
  number:any;
  private subscriptions = new Subscription();
  constructor(public _ServiceService:ServiceService){}
  ngOnInit() {
    this.number=8;
    this.getAll(this.number);
  }
  updateNewsByCategories(){
        this.filterNews = this.News.filter(item =>
          item.sourceID + '' === this.category + ''
        );
}
updateNewsByTitle(){
  this.filterNews = this.News.filter(item =>
    item.title.toLowerCase().includes(this.title.toLowerCase())
  );
}
  updateFilterNews() {
    
    if (this.title || this.category) {
      this.updateNewsByCategories();
      this.updateNewsByTitle();
    }

  }
 getAll(number){
   this.subscriptions.add( this._ServiceService.getData().subscribe(e => {
    this.News=e.articles;
    this.filterNews=e.articles;
    this.categories=e.sourceCategory;
    this.filterNews.splice(number);
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
 LoadMore(){
  this.number+=4;
  this.getAll(this.number);
}
 ngOnDestroy() {
   this.subscriptions.unsubscribe();
 }
 

}
