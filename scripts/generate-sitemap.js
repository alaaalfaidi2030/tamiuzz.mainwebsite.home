/**
 * Sitemap Generator Script
 * Run with: node scripts/generate-sitemap.js
 *
 * This script generates a comprehensive sitemap.xml with:
 * - All static pages
 * - Dynamic article, service, and solution pages (fetched from API)
 * - Proper hreflang tags for Arabic and English
 * - Lastmod dates
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://tamiuzz.com';
const API_BASE = 'https://api.tamiuzz.com'; // Update with actual API URL

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/solutions', priority: 0.9, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/articles', priority: 0.8, changefreq: 'daily' },
  { path: '/about-us', priority: 0.7, changefreq: 'monthly' },
  { path: '/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },
  { path: '/policy', priority: 0.3, changefreq: 'yearly' },
];

// Supported languages
const LANGUAGES = ['ar', 'en'];
const DEFAULT_LANGUAGE = 'ar';

/**
 * Generate XML for a single URL entry with hreflang
 */
function generateUrlEntry(pagePath, priority, changefreq, lastmod = null) {
  const fullUrl = `${BASE_URL}${pagePath}`;
  const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : `<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`;

  // Generate hreflang links
  const hreflangLinks = LANGUAGES.map(lang =>
    `    <xhtml:link rel="alternate" hreflang="${lang}" href="${fullUrl}?lang=${lang}" />`
  ).join('\n');

  const defaultHreflang = `    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}" />`;

  return `  <url>
    <loc>${fullUrl}</loc>
    ${lastmodTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks}
${defaultHreflang}
  </url>`;
}

/**
 * Fetch dynamic content from API (articles, services, solutions)
 */
async function fetchDynamicContent() {
  const dynamicPages = [];

  try {
    // Note: Replace these with actual API calls when running in production
    // For now, we'll use placeholder structure

    // Articles
    // const articlesResponse = await fetch(`${API_BASE}/blog`);
    // const articles = await articlesResponse.json();
    // articles.data?.forEach(article => {
    //   dynamicPages.push({
    //     path: `/articles/${article._id || article.id}`,
    //     priority: 0.7,
    //     changefreq: 'monthly',
    //     lastmod: article.updatedAt || article.createdAt
    //   });
    // });

    // Services
    // const servicesResponse = await fetch(`${API_BASE}/services`);
    // const services = await servicesResponse.json();
    // services.data?.forEach(service => {
    //   dynamicPages.push({
    //     path: `/services/${service.path || service.id}`,
    //     priority: 0.8,
    //     changefreq: 'monthly'
    //   });
    // });

    // Solutions
    // const solutionsResponse = await fetch(`${API_BASE}/solutions`);
    // const solutions = await solutionsResponse.json();
    // solutions.data?.forEach(solution => {
    //   dynamicPages.push({
    //     path: `/solutions/${solution.path || solution.id}`,
    //     priority: 0.8,
    //     changefreq: 'monthly'
    //   });
    // });

    console.log(`Fetched ${dynamicPages.length} dynamic pages`);
  } catch (error) {
    console.error('Error fetching dynamic content:', error.message);
    console.log('Continuing with static pages only...');
  }

  return dynamicPages;
}

/**
 * Generate the complete sitemap XML
 */
async function generateSitemap() {
  console.log('Generating sitemap...');

  // Fetch dynamic pages
  const dynamicPages = await fetchDynamicContent();

  // Combine static and dynamic pages
  const allPages = [...STATIC_PAGES, ...dynamicPages];

  // Generate URL entries
  const urlEntries = allPages.map(page =>
    generateUrlEntry(page.path, page.priority, page.changefreq, page.lastmod)
  ).join('\n');

  // Create the complete sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

  // Write to public folder
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf8');

  console.log(`Sitemap generated successfully at: ${outputPath}`);
  console.log(`Total pages: ${allPages.length}`);
}

// Run the generator
generateSitemap().catch(console.error);
