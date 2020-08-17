import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private _http: HttpClient) { }

  getAllChapters(page = 1){
    return this._http.get<Episode[]>(`${environment.urlBase}episode/?page=${page}`)
  }

  getChapterById(id: number){
    return this._http.get<Episode>(`${environment.urlBase}episode/${id}`)
  }

  getCharacterByEpisode(urlData: string){
    return this._http.get<Episode>(`${urlData}`)
  }
}

