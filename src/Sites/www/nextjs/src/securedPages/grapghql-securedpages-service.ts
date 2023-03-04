import { GraphQLClient, GraphQLRequestClient } from "@sitecore-jss/sitecore-jss";


export type SecuredPageMapping =
 {
    cookieName: string
    loginRedirectUrl: string
  };
  const pathId: string = process.env.SECUREDPAGES_PATH_ID ?? "";
  const templateId: string = process.env.SECUREDPAGES_TEMPLATE_ID ?? "";
 
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
          CookieName: field(name: "CookieName") {
            value
          }
          LoginRedirectUrl: field(name: "LoginRedirectUrl") {
            value
          }
        }
      }
    }
`;

export type GraphQLSecuredPagesServiceConfig =  {
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
    total: number,
    results: resultEntry[]
  };
};
export type resultEntry = {
  UrlMapping:resultField,
  CookieName:resultField,
  LoginRedirectUrl:resultField,
}

export type resultField={
  value:string 
}
/**
 *  The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint
 */
export class GraphQLSecuredPagesService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL redirects service with the provided options
   * @param {GraphQLSecuredPagesServiceConfig} options instance
   */
  constructor(private options: GraphQLSecuredPagesServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch an array of redirects from API
   * @param {string} siteName site name
   * @returns Promise<RedirectInfo[]>
   * @throws {Error} if the siteName is empty.
   */
  async fetchSecuredPagesMapping(): Promise<SecuredPagesQueryResult> {
    
    let data = null

    if (!data) {
      data = await this.graphQLClient.request<SecuredPagesQueryResult>(this.query, {
        pathId: pathId,
      templateId: templateId
      });
    }

    return data ;
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

  
}