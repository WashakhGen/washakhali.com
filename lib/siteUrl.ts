import "server-only";

/**
 * Absolute site URL for metadata, sitemap and robots. On Vercel this is the production
 * domain (your-project.vercel.app, or a custom domain once one is added); locally it is localhost.
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
