import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.css'
})
export class LegalNoticeComponent {
  protected readonly translate = inject(TranslateService);
  private readonly seoService = inject(SeoService);

  protected readonly currentLang = computed(() => 
    this.translate.currentLang() || 'en'
  );

  constructor() {
    this.seoService.updateMeta(
      'Legal Notice | Impressum | Dennis Martin Herbers',
      'Legal Notice and Impressum information for dmh.dev. Contact details and legal disclosures.',
      '/legal-notice'
    );
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
