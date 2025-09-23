import { ApiInterface } from '../interfaces/api'
import { DataModel } from './data-model'
import { activeApi, FormWapper, CRUDFeatures, GraphQLApi, RestApi, BuiltInAction, baseUrl, accessTokenHeader } from '../index'
import { createQueryWithFilters, getGraphQLFields, getMutationSchema } from '../apis/graphql/schemas';
import axios from 'axios';

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

  api: ApiInterface

  constructor(api?: ApiInterface, endpoint?: string) {
    super()
    this.api = api || activeApi
  }
  async fetchAll(paginationParams: PaginationParams = defaultParams, options: any, requestFields: {field: string}[]): Promise<{itemCount: number, items: T[]} | null> {
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).query(
                      `getAll${(this.constructor as typeof CRUDModel).getModelNamePlural()}`,
                      createQueryWithFilters(
                        `getAll${(this.constructor as typeof CRUDModel).getModelNamePlural()}`, 
                        requestFields? getGraphQLFields(requestFields) : (this.constructor as typeof CRUDModel).getGraphqlFields()
                      ),
                      paginationParams, 
                      options
                    )
    } else if (this.api instanceof RestApi) {
      // const result = await (this.api as RestApi).get(paginationParams) 
    }
    // 0674897173 - asha ally
    return null
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
      // const result = await (this.api as RestApi).create(data) 
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
      // const result = await (this.api as RestApi).create(data) 
    }

    return {status: false, data: null}
  }

  async delete(id: number | string): Promise<boolean> {
    // return await this.service.delete(id)
    return false
  }

  async getTemplate(): Promise<boolean> {
    try {
      const response = await axios.get(
        `${baseUrl}${this.getEndpointPlural()}/template`,
        {
          responseType: "blob", // important for binary data
          headers: {
            ...accessTokenHeader,
          },
        }
      );

      // Extract filename from Content-Disposition header
      let filename = `${(this.constructor as typeof CRUDModel).getModelNamePlural()}.csv`;
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // use server-provided name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // cleanup
      return true;
    } catch (error) {
      console.error(
        `Error downloading template of ${(this.constructor as typeof CRUDModel).getModelName()}:`,
        error
      );
      return false;
    }
  }

  async importTemplate(formData: FormData): Promise<boolean> {
    try {
      const response = await axios.post(
        `${baseUrl}${this.getEndpointPlural()}/upload`,
        formData,
        {
          headers: {
            ...accessTokenHeader,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
    return true
  }
}

type SortOrder = "asc" | "desc";

type Search = {
  field: string;
  value: string;
}

type Filter = {
  field: string;
  comparator: string;
  value: any;
}

export class PaginationParams {
  page: number = 1;
  pageSize: number = 10;
  sortBy?: string;
  sortOrder?: SortOrder;
  searchColumns: string[] = [];
  searchQuery?: string
  filters?: Filter[];

  constructor(init?: Partial<PaginationParams>) {
    Object.assign(this, init);
  }

  /**
   * Add a search column if it's not already in the list.
   */
  addSearchColumn(column: string | string[]): void {
    column = Array.isArray(column) ? column : [column];
    for (const c of column) {
      if (!this.searchColumns.includes(c)) {
        this.searchColumns.push(c);
      }
    }
  }

  /**
   * Remove a search column if it exists.
   */
  removeSearchColumn(column: string | string[]): void {
    column = Array.isArray(column) ? column : [column];
    for (const c of column) {
      this.searchColumns = this.searchColumns.filter(c => c !== c);
    }
  }
}

export const defaultParams = new PaginationParams();