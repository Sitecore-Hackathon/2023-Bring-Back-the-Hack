
import { MiddlewarePlugin } from 'lib/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { SecuredPagesMiddleware } from 'src/middleware/securedpages-middleware';
import config from 'temp/config';

class SecuredPagesPlugin implements MiddlewarePlugin {
  private securedPagesMiddleware: SecuredPagesMiddleware;
  order = 1;

  constructor() {
    this.securedPagesMiddleware = new SecuredPagesMiddleware({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      // These are all the locales you support in your application.
      // These should match those in your next.config.js (i18n.locales).
      locales: ['en'],
      // This function determines if a route should be excluded from RedirectsMiddleware.
      // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to exclude more.
      // This is an important performance consideration since Next.js Edge middleware runs on every request.
      excludeRoute: () => false,
      // This function determines if the middleware should be turned off.
      // By default it is disabled while in development mode.
      disabled: () => false//=> process.env.NODE_ENV === 'development',
      // This function resolves site based on hostname
    });
  }

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest, res?:NextResponse): Promise<NextResponse> {
    return this.securedPagesMiddleware.getHandler()(req, res);
  }
}

export const SecuredPagesPlugin = new SecuredPagesPlugin();