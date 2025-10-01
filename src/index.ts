import { GraphQLApi } from './apis/graphql/api';
import { ApiInterface } from './interfaces/api';

export * from './utils/types'
export * from './utils/helpers'
export * from './interfaces/crud-features'
export * from './models/data-model'
export * from './models/crud-model'
// export * from './models/workflow-model'
export * from './models/decorators'
export * from './interfaces/attachable'
export * from './interfaces/workfloable'
export * from './apis/rest/api'
export * from './apis/graphql/api'
export * from './apis/graphql/schemas'

export let activeApi: ApiInterface;
export let baseUrl: string;
export let accessTokenHeader: Record<string, string>;

export function setApi(api: ApiInterface) {
  activeApi = api;
}

export function getApi(): ApiInterface {
  return activeApi;
}

export function setBaseUrl(url: string) {
  baseUrl = url;
}

export function setAccessTokenHeader(token: Record<string, string>) {
  accessTokenHeader = token;
}