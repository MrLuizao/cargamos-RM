import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  public idEpisode: number;
  public urlData: []=[];
  public singleCharacter: any;

  public name: string;
  public gender: string;
  public image: string;

  charachters: Episode[]=[];
  dataJoined: Episode[]=[]

  constructor( private _route: ActivatedRoute, public apiService: RestApiService ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.idEpisode = params['id'];
    });
    console.log('esto llega por parametros', this.idEpisode);
    
    this.getDetailItem();
    
  }

  getDetailItem(){
    this.apiService.getChapterById(this.idEpisode)
    .subscribe( (resp:any) => {
        this.charachters = resp.characters ;
        this.urlData = resp.characters
      console.log('nuevo servicio', resp);
      console.log('estas son las urls', this.urlData);
      this.getDataCharacters();
    });
  }

  getDataCharacters(){
    const url = this.urlData;
    let arrayJoin = this.dataJoined;
    url.forEach(urlNew => {
      this.apiService.getCharacterByEpisode(urlNew)
      .subscribe( (resp:any) => {
        this.singleCharacter = resp ;
        arrayJoin.push(this.singleCharacter)
      })
    });    
    console.log('arrayJoin', arrayJoin)
  
  }

}
