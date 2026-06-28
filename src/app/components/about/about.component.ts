import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private readonly seoService = inject(SeoService);

  constructor() {
    this.seoService.updateMeta(
      'About Me | Dennis Martin Herbers',
      'Learn more about Dennis Martin Herbers, my skills in Web Development, Angular, NestJS, and what drives my software engineering philosophy.',
      '/about'
    );
  }
}
