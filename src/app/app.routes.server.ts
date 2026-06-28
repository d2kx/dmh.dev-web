import { RenderMode, ServerRoute } from '@angular/ssr';
import * as fs from 'fs';
import * as path from 'path';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      try {
        const filePath = path.join(process.cwd(), 'public/blog/posts.json');
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const posts = JSON.parse(fileContent);
          return posts.map((post: { slug: string }) => ({ slug: post.slug }));
        }
      } catch (err) {
        console.error('Error reading blog posts for prerendering:', err);
      }
      return [];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
