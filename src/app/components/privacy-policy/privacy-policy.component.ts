import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
  private readonly seoService = inject(SeoService);

  constructor() {
    this.seoService.updateMeta(
      'Privacy Policy | Datenschutzerklärung | Dennis Martin Herbers',
      'Privacy Policy and data protection disclosures for dmh.dev. Learn how we handle your data.',
      '/privacy-policy',
    );
  }
}
