import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { TranslationService } from '../services/translation.service';

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
  translationService = inject(TranslationService);

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

  resetZoom(event: MouseEvent) {
    const zoomDiv = event.target as HTMLElement;
    zoomDiv.style.backgroundPosition = `center`;
    zoomDiv.style.backgroundSize = `100%`;
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert(this.translationService.getTranslation('GIFT.COPY_SUCCESS'));
    }).catch(err => {
      console.error(this.translationService.getTranslation('GIFT.COPY_ERROR'), err);
    });
  }

  private isMobile(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
}
