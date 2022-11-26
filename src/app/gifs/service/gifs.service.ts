import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public resultados: Gif[] = [];

  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = '2ThNkZ6iOsDfCgWy9ClHinqKecsnb79w';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private _http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    this._http
      .get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        if (this.resultados?.length > 0) {
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        }
      });
  }
}
