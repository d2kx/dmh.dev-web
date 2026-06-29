import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { marked } from 'marked';
import { BlogService, BlogPostMetadata } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly seoService = inject(SeoService);

  protected readonly postContent = signal<string | null>(null);
  protected readonly currentPost = signal<BlogPostMetadata | null>(null);
  protected readonly isLoading = signal<boolean>(true);
  protected readonly postNotFound = signal<boolean>(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  private loadPost(slug: string): void {
    this.isLoading.set(true);
    this.postContent.set(null);
    this.currentPost.set(null);
    this.postNotFound.set(false);

    // Retrieve post metadata from registry first
    this.blogService.getPosts().subscribe((posts) => {
      const post = posts.find((p) => p.slug === slug);
      if (post) {
        this.currentPost.set(post);
        this.seoService.updateMeta(post.title, post.excerpt, `/blog/${slug}`);

        // Fetch markdown contents
        this.blogService.getPostContent(slug).subscribe({
          next: (markdown) => {
            // Parse markdown to HTML
            const html = marked.parse(markdown) as string;
            this.postContent.set(html);
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error(err);
            this.postContent.set('<p>Error loading blog post. Please try again later.</p>');
            this.isLoading.set(false);
          },
        });
      } else {
        // Blog post does not exist
        this.seoService.updateMeta(
          'Blog Post Not Found',
          'The requested blog post could not be found or was deleted.',
          `/blog/${slug}`,
        );
        this.postNotFound.set(true);
        this.isLoading.set(false);
      }
    });
  }
}
