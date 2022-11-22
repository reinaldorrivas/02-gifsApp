import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public resultados: Gif[] = [];

  private _apiKey: string = '2ThNkZ6iOsDfCgWy9ClHinqKecsnb79w';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private _http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this._http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=2ThNkZ6iOsDfCgWy9ClHinqKecsnb79w&q=${query}&limit=10`
      )
      .subscribe((resp) => (this.resultados = resp.data));
  }
}
