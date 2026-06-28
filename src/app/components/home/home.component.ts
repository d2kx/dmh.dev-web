import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly blogService = inject(BlogService);
  private readonly seoService = inject(SeoService);
  
  private readonly posts = toSignal(this.blogService.getPosts());
  protected readonly latestPosts = computed(() => this.posts()?.slice(0, 3));

  constructor() {
    this.seoService.updateMeta(
      'Dennis Martin Herbers | Web Developer & Software Engineer',
      'Personal portfolio and developer blog of Dennis Martin Herbers. Thoughts on web development, NestJS, Angular, and software engineering.',
      ''
    );
  }
}
