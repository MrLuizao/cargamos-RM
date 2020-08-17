import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { RestApiService } from 'src/app/services/rest-api.service';
import { Episode } from 'src/app/models/episode.model';
import { take } from 'rxjs/operators'
import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  dataService: Episode[]=[];

  info: RequestInfo = {
    next: null,
  }

  page = 1;
  scrollHidden = 200;
  scrollShow = 450;
  viewScrollTopBtn = false;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    public apiService: RestApiService) { }

    @HostListener('window:scroll', [])
    onWindowScroll(){
      const yOffset = window.pageYOffset;
      if ((yOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.scrollHidden ){
        this.viewScrollTopBtn = true;
      }else if (this.viewScrollTopBtn && (yOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.scrollHidden){
        this.viewScrollTopBtn = false;
      }
    }
    
  ngOnInit() {
    this.getDataItems();
    // this.renderDataItems();
  }

  getDataItems(){
    this.apiService.getAllChapters(this.page)
    .subscribe( (resp:any) => {
      const { info, results} = resp;
        this.dataService = results;
        this.info = info;
      console.log({ info, results});
    })
  }

  renderDataItems(){
    this.apiService.getAllChapters()
    .pipe( take(1))
    .subscribe( (resp:any) => {
      if(resp?.results?.length){
        const { info, results} = resp.results;
        this.dataService = [...this.dataService, results];
        this.info = info;
      }else{
        this.dataService = [];
      }
    })
  }

  onScrollRender(){
    if(this.info.next){
      this.page++;

    this.apiService.getAllChapters(this.page)
    .pipe( take(1))
    .subscribe( (resp:any) => {
      if(resp?.results?.length){
        const { info, results} = resp.results;
        this.dataService = [...this.dataService, results];
        this.info = info;
      }
    })

    }
  }

  goScrollTop(){
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop =0;
  }

  openDetails(id){
    console.log(id);
  }

}
