import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { BlogPostComponent } from './blog-post.component';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

describe('BlogPostComponent', () => {
  let blogServiceMock: {
    getPosts: ReturnType<typeof vi.fn>;
    getPostContent: ReturnType<typeof vi.fn>;
  };
  let seoServiceMock: {
    updateMeta: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    blogServiceMock = {
      getPosts: vi.fn().mockReturnValue(
        of([
          {
            title: 'Post 1',
            slug: 'post-1',
            publishedAt: '2026-01-01',
            excerpt: 'Excerpt 1',
          },
        ]),
      ),
      getPostContent: vi.fn().mockReturnValue(of('# Post Content')),
    };

    seoServiceMock = {
      updateMeta: vi.fn(),
    };
  });

  it('should load post if slug exists in metadata list', async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ slug: 'post-1' })),
          },
        },
        { provide: BlogService, useValue: blogServiceMock },
        { provide: SeoService, useValue: seoServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(BlogPostComponent);
    fixture.detectChanges();

    expect(blogServiceMock.getPosts).toHaveBeenCalled();
    expect(blogServiceMock.getPostContent).toHaveBeenCalledWith('post-1');
    expect(fixture.componentInstance['postNotFound']()).toBe(false);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.post-article')).toBeTruthy();
    expect(compiled.querySelector('.post-not-found')).toBeFalsy();
  });

  it('should display not found message if slug does not exist in metadata list', async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ slug: 'gfdgdf' })),
          },
        },
        { provide: BlogService, useValue: blogServiceMock },
        { provide: SeoService, useValue: seoServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(BlogPostComponent);
    fixture.detectChanges();

    expect(blogServiceMock.getPosts).toHaveBeenCalled();
    expect(blogServiceMock.getPostContent).not.toHaveBeenCalled();
    expect(fixture.componentInstance['postNotFound']()).toBe(true);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.post-article')).toBeFalsy();
    expect(compiled.querySelector('.post-not-found')).toBeTruthy();
  });
});
