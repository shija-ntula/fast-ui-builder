import { ApiInterface } from '../interfaces/api'
import { DataModel } from './data-model'
import { activeApi, FormWapper, CRUDFeatures, GraphQLApi, RestApi, BuiltInAction, baseUrl, accessTokenHeader, toSnakeCase, ColumnProps, DynamicAction, fieldValue } from '../index'
import { createQueryWithFilters, createGetByIdQuery, getGraphQLFields, getMutationSchema, getDeleteMutation } from '../apis/graphql/schemas';
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
    export: true,
    pagination: true
  };

  static gridWidth: number = 12

  api: ApiInterface

  static customActions: DynamicAction[] = []

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
                        requestFields? 
                          typeof requestFields === 'string' ? 
                            requestFields 
                          : getGraphQLFields(requestFields) 
                            : (this.constructor as typeof CRUDModel).getGraphqlFields()
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
  
  async fetchById(id: number | string, options: any, requestFields: {field: string}[] | string): Promise<T | null> {
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).queryById(
                      `get${(this.constructor as typeof CRUDModel).getModelName()}ById`,
                      createGetByIdQuery(
                        `get${(this.constructor as typeof CRUDModel).getModelName()}ById`, 
                        requestFields? 
                          typeof requestFields === 'string' ? 
                            requestFields 
                          : getGraphQLFields(requestFields) 
                            : (this.constructor as typeof CRUDModel).getGraphqlFields()
                      ),
                      id,
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
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).delete(
                      `delete${(this.constructor as typeof CRUDModel).getModelName()}`,
                      getDeleteMutation(
                        `delete${(this.constructor as typeof CRUDModel).getModelName()}`),
                      id
                    )
    } else if (this.api instanceof RestApi) {
      // const result = await (this.api as RestApi).create(data) 
    }

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

  describe(): string | null {
    const columns = (this.constructor as typeof CRUDModel).getColumns();

    if (columns.length === 0) {
      return null; // no columns defined
    }

    const firstCol = columns[0];
    
    // Access value from instance
    return fieldValue(firstCol, this)
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
  filters: string[] = [];

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
    for (const col of column) {
      this.searchColumns = this.searchColumns.filter(c => c !== col);
    }
  }
  
  addFilters(filter: Filter | Filter[]): void {
    const filters = Array.isArray(filter) ? filter : [filter];
    for (const c of filters) {
      const filterString = `${toSnakeCase(c.field).replace('.', '__')},${c.comparator},${c.value}`;
      if (!this.filters.includes(filterString)) {
        this.filters.push(filterString);
      }
    }
  }

  /**
   * Remove a search column if it exists.
   */
  removeFilters(field: string): void {
    this.filters = this.filters.filter(c => !c.startsWith(`${toSnakeCase(field).replace('.', '__')},`));
  }
}

export const defaultParams = new PaginationParams();

export abstract class WorkflowModel<T extends WorkflowModel<T>> extends CRUDModel<T> {
  
  @ColumnProps({ order: 99 })
  evaluationStatus!: string

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

  async fetchEvaluations(paginationParams: PaginationParams = defaultParams, options: any, requestFields: {field: string}[]): Promise<{itemCount: number, items: T[]} | null> {
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
  
  async transit(data: EvaluationStatus): Promise<{status: boolean, data: boolean | null}> {
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).mutate(
                      `transit${(this.constructor as typeof CRUDModel).getModelName()}`,
                      getMutationSchema(
                        `transit${(this.constructor as typeof CRUDModel).getModelName()}`, 
                        `EvaluationStatus`, 
                        false, 
                        null,
                      ),
                      data
                    )
    } else if (this.api instanceof RestApi) {
      // const result = await (this.api as RestApi).create(data) 
    }

    return {status: false, data: null}
  }
}

export class EvaluationStatus {
  objectId!: string | number;
  remark!: string;
  status!: string;
}

export abstract class AttachmentModel<T extends AttachmentModel<T>> extends CRUDModel<T> {}

export abstract class FullCRUDModel<T extends FullCRUDModel<T>> extends WorkflowModel<T> {}