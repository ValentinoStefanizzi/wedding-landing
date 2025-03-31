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
    if (this.isMobile()) return; // Prevent mouse events on mobile
    const zoomDiv = event.target as HTMLElement;
    const { offsetX, offsetY, target } = event;
    const { offsetWidth, offsetHeight } = target as HTMLElement;
  
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
  
    zoomDiv.style.backgroundPosition = `${x}% ${y}%`;
    zoomDiv.style.backgroundSize = `250%`;
  }

  zoomTouch(event: TouchEvent) {
    if (!this.isMobile()) return; // Prevent touch events on desktop
    const zoomDiv = event.target as HTMLElement;
    const touch = event.touches[0];
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    const { offsetWidth, offsetHeight } = target;

    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;

    zoomDiv.style.backgroundPosition = `${x}% ${y}%`;
    zoomDiv.style.backgroundSize = `250%`;
  }

  resetZoom(event: MouseEvent | TouchEvent) {
    const zoomDiv = event.target as HTMLElement;
    zoomDiv.style.backgroundPosition = `center`;
    zoomDiv.style.backgroundSize = `100%`;
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  private isMobile(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
}
