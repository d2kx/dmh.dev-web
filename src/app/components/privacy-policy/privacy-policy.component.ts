import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
  protected readonly translate = inject(TranslateService);
  private readonly seoService = inject(SeoService);

  protected readonly currentLang = computed(() => this.translate.currentLang() || 'en');

  constructor() {
    this.seoService.updateMeta(
      'Privacy Policy | Datenschutzerklärung | Dennis Martin Herbers',
      'Privacy Policy and data protection disclosures for dmh.dev. Learn how we handle your data.',
      '/privacy-policy',
    );
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
