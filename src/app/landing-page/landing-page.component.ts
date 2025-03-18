import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s 2s', style({ opacity: 1 }))
      ])
    ])
  ],
  imports: [
    TranslatePipe,
    CommonModule
  ]
})

export class LandingPageComponent{
  animationState = false;
  translationService = inject(TranslationService);
}
