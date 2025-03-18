import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent {
  title = 'wedding-landing';

  translateService = inject(TranslateService);
  translationService = inject(TranslationService);

  ngOnInit() {
    this.setLang();
  }

  private setLang() {
    this.translateService.setDefaultLang(this.translationService.getDefaultLang());
  }

}
