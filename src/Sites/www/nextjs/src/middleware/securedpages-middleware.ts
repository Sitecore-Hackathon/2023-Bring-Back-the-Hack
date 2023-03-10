import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import regexParser from 'regex-parser';
import {
  GraphQLSecuredPagesService,
  GraphQLSecuredPagesServiceConfig,
  resultEntry,
} from 'src/securedPages/grapghql-securedpages-service';

/**
 * extended SecuredPagesMiddlewareConfig config type for SecuredPagesMiddleware
 */
export type SecuredPagesMiddlewareConfig = Omit<GraphQLSecuredPagesServiceConfig, 'fetch'> & {
  locales: string[];
  /**
   * Function used to determine if route should be excluded from SecuredPagesMiddleware.
   * By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
   * This is an important performance consideration since Next.js Edge middleware runs on every request.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route from SecuredPagesMiddleware
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * function, determines if middleware should be turned off, based on cookie, header, or other considerations
   *  @param {NextRequest} [req] optional: request object from middleware handler
   *  @param {NextResponse} [res] optional: response object from middleware handler
   * @returns {boolean} false by default
   */
  disabled?: (req?: NextRequest, res?: NextResponse) => boolean;

  /**
   * fallback hostname in case `host` header is not present
   * @default localhost
   */
  defaultHostname?: string;
};
/**
 * Middleware / handler fetches all secured pages mappings from Sitecore instance by grapqhl service
 *
 */
export class SecuredPagesMiddleware {
  private securedPagesService: GraphQLSecuredPagesService;
  // private locales: string[];
  private defaultHostname: string;

  /**
   * @param {SecuredPagesMiddlewareConfig} [config] secured pages middleware config
   */
  constructor(protected config: SecuredPagesMiddlewareConfig) {
    // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
    // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
    this.securedPagesService = new GraphQLSecuredPagesService({ ...config, fetch: fetch });
    // this.locales = config.locales;
    this.defaultHostname = config.defaultHostname || 'localhost';
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return this.handler;
  }

  protected excludeRoute(pathname: string) {
    if (
      pathname.includes('.') || // Ignore files
      pathname.startsWith('/api/') || // Ignore Next.js API calls
      pathname.startsWith('/sitecore/') || // Ignore Sitecore API calls
      pathname.startsWith('/_next') // Ignore next service calls
    ) {
      return true;
    }
    return false;
  }

  protected getHostname(req: NextRequest) {
    const hostHeader = req.headers.get('host')?.split(':')[0];
    return hostHeader || this.defaultHostname;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const createResponse = async () => {
      // CASE: Ignore
      if (
        (this.config.disabled && this.config.disabled(req, NextResponse.next())) ||
        this.excludeRoute(req.nextUrl.pathname) ||
        (this.config.excludeRoute && this.config.excludeRoute(req.nextUrl.pathname))
      ) {
        return res || NextResponse.next();
      }

      const existsSecuredPageMapping = await this.getExistsSecuredPages(req);

      // CASE: Not Secured
      if (!existsSecuredPageMapping) {
        return res || NextResponse.next();
      }

      if (await this.isAuthorized(req)) {
        // CASE: Secured but user is authorized
        return res || NextResponse.next();
      }

      // CASE: Secured, not authorized -> redirect
      const url = req.nextUrl.clone();

      url.pathname = existsSecuredPageMapping.LoginRedirectUrl.value;
      url.locale = req.nextUrl.locale;

      const loginUrl = decodeURIComponent(url.href);
      return NextResponse.redirect(loginUrl, 302);
    };

    const response = await createResponse();

    return response;
  };

  private async isAuthorized(req: NextRequest): Promise<boolean> {
    const secret = process.env.SECRET;
    const token = await getToken({ req, secret });
    return !!token;
  }
  /**
   * Method returns resultEntry when matches
   * @param {NextRequest} req request
   * @returns Promise<resultEntry | undefined>
   * @private
   */
  private async getExistsSecuredPages(req: NextRequest): Promise<resultEntry | undefined> {
    const securedPages = await this.securedPagesService.fetchSecuredPagesMapping();

    if (securedPages && securedPages.search && securedPages.search.total > 0) {
      const total = securedPages.search?.results ? securedPages.search?.results.length : 0;
      for (let i = 0; i < total; i++) {
        const urlMappings = securedPages.search?.results[i]?.UrlMapping.value;
        const split = urlMappings.split(/\r?\n/);
        for (const each in split) {
          const urlMapping = split[each];

          if (!urlMapping) {
            continue;
          }
          if (urlMapping && urlMapping != '') {
            if (
              regexParser(urlMapping.toLowerCase()).test(req.nextUrl.pathname.toLowerCase()) ||
              regexParser(urlMapping.toLowerCase()).test(
                `/${req.nextUrl.locale}${req.nextUrl.pathname}`.toLowerCase()
              )
            ) {
              if (!!securedPages.search?.results[i].LoginRedirectUrl) {
                return securedPages.search?.results[i];
              }
            }
          }
        }
      }
    }
    return undefined;
  }
}
