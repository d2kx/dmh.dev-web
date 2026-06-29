import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogPostMetadata } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-post-card.component.html',
  styleUrl: './blog-post-card.component.css',
})
export class BlogPostCardComponent {
  post = input<BlogPostMetadata | undefined>(undefined);
}
