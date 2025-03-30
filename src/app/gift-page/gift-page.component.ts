import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from "../navbar/navbar.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-gift-page',
  templateUrl: './gift-page.component.html',
  styleUrls: ['./gift-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ],
  imports: [NavbarComponent, TranslatePipe]
})
export class GiftPageComponent { 
  zoom(event: MouseEvent) {
    const zoomDiv = event.target as HTMLElement;
    const { offsetX, offsetY, target } = event;
    const { offsetWidth, offsetHeight } = target as HTMLElement;
  
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
  
    zoomDiv.style.backgroundPosition = `${x}% ${y}%`;
    zoomDiv.style.backgroundSize = `250%`;
  }

  resetZoom(event: MouseEvent) {
    const zoomDiv = event.target as HTMLElement;
    zoomDiv.style.backgroundPosition = `center`;
    zoomDiv.style.backgroundSize = `100%`;
  }
}
