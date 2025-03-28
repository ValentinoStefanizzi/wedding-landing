import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';

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

  get currentLanguage() {
    return this.translationService.getCurrentLang();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
