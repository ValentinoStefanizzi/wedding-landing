import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [
    TranslatePipe,
    CommonModule
  ]
})

export class LandingPageComponent {
  animationState = false;
  showContent = false;
  showOverlay = true;

  translationService = inject(TranslationService);

  startAnimation() {
    this.animationState = true;
    setTimeout(() => {
      this.showOverlay = false;
    }, 2500);
    setTimeout(() => {
      this.showContent = true;
    }, 300);
  }
}
