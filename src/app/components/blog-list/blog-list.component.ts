import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';
import { BlogPostCardComponent } from '../blog-post-card/blog-post-card.component';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, BlogPostCardComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  private readonly blogService = inject(BlogService);
  private readonly seoService = inject(SeoService);

  protected readonly posts = toSignal(this.blogService.getPosts());

  constructor() {
    this.seoService.updateMeta(
      'Blog | Dennis Martin Herbers',
      'Read all articles and thoughts on web development, software engineering, and clean code written by Dennis Martin Herbers.',
      '/blog',
    );
  }
}
