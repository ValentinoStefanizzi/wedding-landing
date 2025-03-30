import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  currentLangSignal = signal<string>('it-IT');

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['it-IT', 'sl-SI']);
    this.translate.setDefaultLang('it-IT');
  }

  useLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLangSignal.set(lang);
  }

  getTranslation(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }

  getTranslationAsync(key: string, params?: any): Observable<string> {
    return this.translate.get(key, params);
  }

  getCurrentLang(): string {
    return this.translate.currentLang;
  }

  getDefaultLang(): string {
    return this.translate.defaultLang;
  }

  getAvailableLanguages(): string[] {
    return this.translate.getLangs();
  }
}
