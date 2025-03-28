import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';
import { CountdownConfig, CountdownModule } from 'ngx-countdown';
import { count } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [
    TranslatePipe,
    CommonModule,
    CountdownModule
  ]
})

export class LandingPageComponent {
  animationState = false;
  showContent = false;
  showOverlay = true;


  getSecondsToDate(): number {
    const futureDate = new Date('2025-05-31T01:00:00');
    const currentDate = new Date();
    return Math.floor((futureDate.getTime() - currentDate.getTime()) / 1000);
  }

  getTotalDays(): number {
    return Math.floor(this.getSecondsToDate() / 86400);
  }

  config: CountdownConfig = {
    leftTime: this.getSecondsToDate(),
    format: 'HH:mm',
    prettyText: (text) => {
      let counter = 0;
      text = `${this.getTotalDays()}:${text}`;
      return text
        .split(':')
        .map((v) => {
          let name = counter == 0 ? 'LANDING.COUNTER_DAYS' : counter == 1 ? 'LANDING.COUNTER_HOURS' : 'LANDING.COUNTER_MINUTES';
          counter++;
          return `<div class="bg-primary p-2 rounded-lg min-w-16 text-center text-white font-bold"> <span class="block text-base">${v}</span> <span class="text-xs uppercase">${this.translationService.getTranslation(name)}</span></div>`
        })
        .join('');
    },
  };

  translationService = inject(TranslationService);

  chooseLanguage(language: string) {
    this.translationService.useLanguage(language);
    this.startAnimation();
  }

  private startAnimation() {
    this.animationState = true;
    setTimeout(() => {
      this.showOverlay = false;
    }, 2500);
    setTimeout(() => {
      this.showContent = true;
    }, 300);
  }
}
