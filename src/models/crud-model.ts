import { ApiInterface } from '../interfaces/api'
import { DataModel } from './data-model'
import { CRUDService } from '../services/crud-service'
import { activeApi, FormWapper, CRUDFeatures, GraphQLApi, RestApi, BuiltInAction } from '../index'
import { createQueryWithFilters, getMutationSchema } from '../apis/graphql/schemas';

export abstract class CRUDModel<T extends CRUDModel<T>> extends DataModel<T> {
  
  static features: CRUDFeatures = {
    create: true,
    search: true,
    filter: true,
    sort: true,
    view: true,
    update: true,
    formWrapper: FormWapper.MODAL,
    delete: true,
    bulk: true,
    export: true
  };

  static gridWidth: number = 12

  service: CRUDService<T, typeof CRUDModel>;
  api: ApiInterface

  constructor(api?: ApiInterface, endpoint?: string) {
    super()
    this.api = api || activeApi
    this.service = new CRUDService<T, typeof CRUDModel>(
      endpoint || this.getEndpoint(),
      this.constructor as unknown as typeof CRUDModel & (new () => T),
      api || activeApi
    );
  }
  async fetchAll(paginationParams: PaginationParams = defaultParams, options: any): Promise<{itemCount: number, items: T[]}> {
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).query(
                      `getAll${(this.constructor as typeof CRUDModel).getModelNamePlural()}`,
                      createQueryWithFilters(
                        `getAll${(this.constructor as typeof CRUDModel).getModelNamePlural()}`, 
                        (this.constructor as typeof CRUDModel).getGraphqlFields()
                      ),
                      paginationParams, 
                      options
                    )
    } else if (this.api instanceof RestApi) {
      const result = await (this.api as RestApi).get(paginationParams) 
    }

    return {itemCount: 0, items: []}
  }

  async create(data: T | T[]): Promise<{status: boolean, data: T | T[] | null}> {
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).mutate(
                      `create${(this.constructor as typeof CRUDModel).getModelName()}`,
                      getMutationSchema(
                        `create${(this.constructor as typeof CRUDModel).getModelName()}`, 
                        `${(this.constructor as typeof CRUDModel).getModelName()}Create`, 
                        Array.isArray(data), 
                        (this.constructor as typeof CRUDModel).getGraphqlFields(),
                      ),
                      data
                    )
    } else if (this.api instanceof RestApi) {
      const result = await (this.api as RestApi).create(data) 
    }

    return {status: false, data: null}
  }

  async update(data: T | T[]): Promise<{status: boolean, data: T | T[] | null}> {
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).mutate(
                      `update${(this.constructor as typeof CRUDModel).getModelName()}`,
                      getMutationSchema(
                        `update${(this.constructor as typeof CRUDModel).getModelName()}`, 
                        `${(this.constructor as typeof CRUDModel).getModelName()}Update`, 
                        Array.isArray(data), 
                        (this.constructor as typeof CRUDModel).getGraphqlFields(),
                      ),
                      data
                    )
    } else if (this.api instanceof RestApi) {
      const result = await (this.api as RestApi).create(data) 
    }

    return {status: false, data: null}
  }

  async delete(id: number | string): Promise<boolean> {
    return await this.service.delete(id)
  }
}

type SortOrder = "asc" | "desc";

interface Search {
  field: string;
  value: string;
}

interface Filter {
  field: string;
  comparator: string;
  value: any;
}

export class PaginationParams {
  page: number = 1;
  pageSize: number = 10;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: Search;
  filters?: Filter[];

  constructor(init?: Partial<PaginationParams>) {
    Object.assign(this, init);
  }
}

export const defaultParams = new PaginationParams();