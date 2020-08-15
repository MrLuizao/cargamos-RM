import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Episode } from 'src/app/models/episode.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  dataService: Episode;

  constructor(public apiService: RestApiService) { }

  ngOnInit() {
    this.getDataFromService();
    
  }

  getDataFromService(){
    this.apiService.getAllChapters()
    .subscribe( (resp:Episode) => {
      this.dataService = resp;
      console.log('data:',this.dataService);
    })
  }

}
