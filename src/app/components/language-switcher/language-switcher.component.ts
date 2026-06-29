import { Component, inject, computed } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  private readonly translate = inject(TranslateService);

  protected readonly currentLang = computed(() => this.translate.currentLang() || 'en');

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
