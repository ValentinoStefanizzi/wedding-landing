import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule
  ]
})
export class NavbarComponent {
  isMenuOpen = false;

  translationService = inject(TranslationService);
  router = inject(Router);
  currentLang = computed(() => this.translationService.currentLangSignal());

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectLanguage(lang: string) {
    this.toggleMenu();
    this.translationService.useLanguage(lang);
  }

  changeRoute(route: string) {
    this.toggleMenu();
    this.router.navigate([route]);
  }
}
