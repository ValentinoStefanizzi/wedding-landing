import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert(this.translationService.getTranslation('GIFT.COPY_SUCCESS'));
    }).catch(err => {
      console.error(this.translationService.getTranslation('GIFT.COPY_ERROR'), err);
    });
  }
}
