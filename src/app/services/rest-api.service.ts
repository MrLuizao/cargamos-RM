import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private _http: HttpClient) { }

  getAllChapters(){
    return this._http.get(environment.urlBase)
  }

  getChapterById(id: number){
    return this._http.get<Episode>(`${environment.urlBase}/${id}`)
  }
}

