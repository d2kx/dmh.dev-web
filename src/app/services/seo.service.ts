import { Service, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Service()
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  updateMeta(title: string, description: string, path = ''): void {
    const fullTitle = path ? `${title} | Dennis Martin Herbers` : title;
    this.titleService.setTitle(fullTitle);

    // Standard SEO Tags
    this.metaService.updateTag({ name: 'description', content: description });

    // Open Graph Tags (Facebook/LinkedIn)
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: `https://www.dmh.dev${path}` });

    // Twitter/X Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }
}
