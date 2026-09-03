/**
 * Batter Bites site Worker — serves the Next.js static export
 * from apps/web/out as static assets.
 */
export default {
  async fetch(request: Request, env: any, _ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Let wrangler's static-asset handler serve the file.
    const response = await env.ASSETS.fetch(request);

    // SPA / clean-route fallback: if a non-file route 404s, try index.html
    if (response.status === 404 && !url.pathname.includes('.')) {
      const fallback = await env.ASSETS.fetch(
        new Request(new URL('/', url.origin), request)
      );
      if (fallback.status === 200) return fallback;
    }

    return response;
  },
};
