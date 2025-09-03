import { GraphQLApi } from './apis/graphql/api';
import { ApiInterface } from './interfaces/api';

export * from './utils/types'
export * from './interfaces/crud-features'
export * from './models/data-model'
export * from './models/crud-model'
export * from './models/decorators'
export * from './interfaces/attachable'
export * from './interfaces/workfloable'
export * from './apis/rest/api'
export * from './apis/graphql/api'

export let activeApi: ApiInterface;

export function setApi(api: ApiInterface) {
  activeApi = api;
}

export function getApi(): ApiInterface {
  return activeApi;
}