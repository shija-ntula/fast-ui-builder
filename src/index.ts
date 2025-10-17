import { GraphQLApi } from './apis/graphql/api';
import { RestApi } from './apis/rest/api';
import { ApiInterface } from './interfaces/api';

export * from './utils/types'
export * from './utils/helpers'
export * from './interfaces/crud-features'
export * from './models/data-model'
export * from './models/crud-model'
export * from './models/decorators'
export * from './interfaces/attachable'
export * from './interfaces/workfloable'
export * from './apis/rest/api'
export * from './apis/graphql/api'
export * from './apis/graphql/schemas'
export { Alert } from './utils/alerts'

export let restApi: RestApi;
export let graphQLApi: GraphQLApi;
export let activeApi: ApiInterface;

export let alertHandler: (title: string, message: string, alert: string) => void = (title, message, alert) => {
  window.alert(`${title}\n${message}\nType: ${alert}`)
}

export function setRestApi(api: RestApi) {
  restApi = api;
}

export function setGraphQLApi(api: GraphQLApi) {
  graphQLApi = api;
}

export function setActiveApi(api: ApiInterface) {
  activeApi = api;
}

export function getApi(): ApiInterface {
  return activeApi;
}

export function setAlertHandler(handler: (title: string, message: string, alert: string) => void) {
  alertHandler = handler;
}