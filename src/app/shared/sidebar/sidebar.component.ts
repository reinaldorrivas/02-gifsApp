import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  get historial() {
    return this.gifsService.historial;
  }

  constructor(public gifsService: GifsService) {}
}
