import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private _http: HttpClient) { }

  getAllChapters(page = 2){
    return this._http.get<Episode[]>(`${environment.urlBase}?page=${page}`)
  }

  getChapterById(id: number){
    return this._http.get<Episode>(`${environment.urlBase}/${id}`)
  }
}

