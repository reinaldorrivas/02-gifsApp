import { Component } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.sass'],
})
export class ResultadosComponent {
  get resultados() {
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) {}
}
