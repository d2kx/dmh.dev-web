import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.css',
})
export class LegalNoticeComponent {
  private readonly seoService = inject(SeoService);

  constructor() {
    this.seoService.updateMeta(
      'Legal Notice | Impressum | Dennis Martin Herbers',
      'Legal Notice and Impressum information for dmh.dev. Contact details and legal disclosures.',
      '/legal-notice',
    );
  }
}
