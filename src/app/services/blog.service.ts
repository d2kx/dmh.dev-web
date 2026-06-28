import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface BlogPostMetadata {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
}

@Service()
export class BlogService {
  private readonly http = inject(HttpClient);
  private postsCache: BlogPostMetadata[] | null = null;
  private readonly contentCache = new Map<string, string>();

  getPosts(): Observable<BlogPostMetadata[]> {
    if (this.postsCache) {
      return of(this.postsCache);
    }
    return this.http.get<BlogPostMetadata[]>('/blog/posts.json').pipe(
      tap(posts => this.postsCache = posts)
    );
  }

  getPostContent(slug: string): Observable<string> {
    const cached = this.contentCache.get(slug);
    if (cached) {
      return of(cached);
    }
    return this.http.get(`/blog/posts/${slug}.md`, { responseType: 'text' }).pipe(
      tap(content => this.contentCache.set(slug, content))
    );
  }
}
