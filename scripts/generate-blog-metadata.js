const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../content/blog');
const destJsonDir = path.join(__dirname, '../public/blog');
const destPostsDir = path.join(__dirname, '../public/blog/posts');
const routesFilePath = path.join(__dirname, '../routes.txt');

// Ensure destination directories exist
if (!fs.existsSync(destJsonDir)) {
  fs.mkdirSync(destJsonDir, { recursive: true });
}
if (!fs.existsSync(destPostsDir)) {
  fs.mkdirSync(destPostsDir, { recursive: true });
}

// Function to parse Frontmatter
function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content: fileContent };
  }

  const yamlLines = match[1].split('\n');
  const content = match[2];
  const metadata = {};

  yamlLines.forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      // Strip outer quotes if present
      metadata[key] = value.replace(/^["']|["']$/g, '');
    }
  });

  return { metadata, content };
}

function main() {
  console.log('Generating blog post metadata...');

  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(srcDir);
  const postsMetadata = [];
  const routes = ['/', '/about', '/blog', '/legal-notice', '/privacy-policy'];

  files.forEach((file) => {
    if (path.extname(file) !== '.md') return;

    const filePath = path.join(srcDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { metadata, content } = parseFrontmatter(fileContent);

    if (!metadata.title || !metadata.slug || !metadata.publishedAt || !metadata.excerpt) {
      console.warn(`Warning: Missing metadata in ${file}. Skipping.`);
      return;
    }

    postsMetadata.push({
      title: metadata.title,
      slug: metadata.slug,
      publishedAt: metadata.publishedAt,
      excerpt: metadata.excerpt,
    });

    // Write clean post body to public/blog/posts/<slug>.md
    const postDestPath = path.join(destPostsDir, `${metadata.slug}.md`);
    fs.writeFileSync(postDestPath, content, 'utf8');

    // Add post route to route list
    routes.push(`/blog/${metadata.slug}`);
  });

  // Sort posts by date descending
  postsMetadata.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Write JSON metadata registry
  const jsonDestPath = path.join(destJsonDir, 'posts.json');
  fs.writeFileSync(jsonDestPath, JSON.stringify(postsMetadata, null, 2), 'utf8');
  console.log(`Successfully generated metadata registry for ${postsMetadata.length} posts.`);

  // Write routes.txt for static prerendering
  fs.writeFileSync(routesFilePath, routes.join('\n'), 'utf8');
  console.log(`Successfully generated routes.txt for prerendering.`);
}

main();
