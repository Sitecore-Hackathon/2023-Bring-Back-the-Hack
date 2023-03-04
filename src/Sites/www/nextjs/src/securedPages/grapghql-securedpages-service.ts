import { debug, GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { CacheClient, CacheOptions, MemoryCacheClient } from '../lib/cache-client';

export type SecuredPageMapping = {
  loginRedirectUrl: string;
};
const pathId: string = process.env.SECUREDPAGES_PATH_ID ?? '';
const templateId: string = process.env.SECUREDPAGES_TEMPLATE_ID ?? '';

// The default query for request redirects of site
const defaultQuery = /* GraphQL */ `
  query SearchSecuredPages($pathId: String!, $templateId: String!) {
    search(
      where: {
        AND: [
          { name: "_path", value: $pathId, operator: CONTAINS }
          { name: "_templates", value: $templateId, operator: CONTAINS }
        ]
      }
      first: 1
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        UrlMapping: field(name: "UrlMapping") {
          value
        }
        LoginRedirectUrl: field(name: "LoginRedirectUrl") {
          value
        }
      }
    }
  }
`;

export type GraphQLSecuredPagesServiceConfig = CacheOptions & {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
   */
  fetch?: typeof fetch;
};

/**
 * The schema of data returned in response to secured pages array request
 */
export type SecuredPagesQueryResult = {
  search: {
    total: number;
    results: resultEntry[];
  };
};
export type resultEntry = {
  UrlMapping: resultField;
  LoginRedirectUrl: resultField;
};

export type resultField = {
  value: string;
};
/**
 *  The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint
 */
export class GraphQLSecuredPagesService {
  private graphQLClient: GraphQLClient;
  private cache: CacheClient<SecuredPagesQueryResult>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL redirects service with the provided options
   * @param {GraphQLSecuredPagesServiceConfig} options instance
   */
  constructor(private options: GraphQLSecuredPagesServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
    this.cache = this.getCacheClient();
  }

  /**
   * Fetch an array of redirects from API
   * @param {string} siteName site name
   * @returns Promise<RedirectInfo[]>
   * @throws {Error} if the siteName is empty.
   */
  async fetchSecuredPagesMapping(): Promise<SecuredPagesQueryResult> {
    const cacheKey = `securedpages-${pathId}`;
    let data = this.cache.getCacheValue(cacheKey);

    if (!data) {
      data = await this.graphQLClient.request<SecuredPagesQueryResult>(this.query, {
        pathId: pathId,
        templateId: templateId,
      });

      debug.http('CACHE MISS - SecurityPages', pathId);
      this.cache.setCacheValue(cacheKey, data);
    } else {
      debug.http('CACHE HIT - SecurityPages', pathId);
    }

    return data;
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    return new GraphQLRequestClient(this.options.endpoint, {
      apiKey: this.options.apiKey,
      fetch: this.options.fetch,
    });
  }

  protected getCacheClient(): CacheClient<SecuredPagesQueryResult> {
    return new MemoryCacheClient<SecuredPagesQueryResult>({
      cacheEnabled: this.options.cacheEnabled ?? true,
      cacheTimeout: this.options.cacheTimeout ?? 10,
    });
  }
}
