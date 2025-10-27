import { ApiInterface } from '../interfaces/api'
import { DataModel } from './data-model'
import { activeApi, FormWapper, CRUDFeatures, GraphQLApi, RestApi, BuiltInAction, toSnakeCase, ColumnProps, DynamicAction, fieldValue, restApi, ModelProps, toCamelCase } from '../index'
import { createQueryWithFilters, createGetByIdQuery, getGraphQLFields, getMutationSchema, getDeleteMutation, createQueryWithoutFilters, createAttachmentMutation, deleteAttachmentMutation } from '../apis/graphql/schemas';
import axios from 'axios';
import { Alert, showAlert } from '../utils/alerts';
import { camelize } from 'vue';

export abstract class CRUDModel<T extends CRUDModel<T>> extends DataModel<T> {
  
  static features: CRUDFeatures = {
    create: true,
    search: true,
    filter: true,
    sort: true,
    view: true,
    update: true,
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
      const data = await restApi.downloadFile(`${this.getEndpointPlural()}/template`, {}, true);
      return data !== null
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
      const response = await restApi.post(
        `${this.getEndpointPlural()}/upload`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      
      return response.status
    } catch (error) {
      showAlert("Import Error", `Something went wrong while importing ${(this.constructor as typeof CRUDModel).getModelNamePlural()}`, Alert.ERROR  )
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
  
  static searchColumns(): string[] {
    return this.getColumns().flatMap((col) => {
          if (col.hidden) {
            return [];
          }
    
          if (Array.isArray(col.displayFields) && col.displayFields.length > 0) {
            return col.displayFields
              .map((f) => {
                if (!f) {
                  return undefined;
                }
                return `${toSnakeCase(col.field)}__${toSnakeCase(f).replace('.', '__')}`;
              })
              .filter((v): v is string => Boolean(v)); // ✅ removes undefined safely
          }
    
          return [toSnakeCase(col.field)];
        });
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

export enum Comparator {
  EXCLUDE = 'exclude',           // Exclude records with this value
  EXACT = 'exact',               // Matches exactly
  IS_NULL = 'isnull',            // Checks if field is null / not null
  NOT_EQUAL = 'ne',              // Not equal to
  I_CONTAINS = 'icontains',      // Case-insensitive contains
  STARTS_WITH = 'startswith',    // Starts with
  ENDS_WITH = 'endswith',        // Ends with
  CONTAINS = 'contains',         // Case-sensitive contains
  GREATER_OR_EQUAL = 'gte',      // Greater than or equal
  LESS_OR_EQUAL = 'lte',         // Less than or equal
  BOOLEAN = 'bool',              // Boolean match (true/false)
  DATE = 'date',                 // Exact date match
  IN = 'in',                     // Value in list
  NOT_IN = 'nin',                // Value not in list
}

export const ComparatorLabels: Record<Comparator, string> = {
  [Comparator.EXCLUDE]: 'Exclude',
  [Comparator.EXACT]: 'Equals',
  [Comparator.IS_NULL]: 'Is Empty',
  [Comparator.NOT_EQUAL]: 'Not Equal',
  [Comparator.I_CONTAINS]: 'Contains (case-insensitive)',
  [Comparator.STARTS_WITH]: 'Starts With',
  [Comparator.ENDS_WITH]: 'Ends With',
  [Comparator.CONTAINS]: 'Contains (case-sensitive)',
  [Comparator.GREATER_OR_EQUAL]: 'Greater Than or Equal',
  [Comparator.LESS_OR_EQUAL]: 'Less Than or Equal',
  [Comparator.BOOLEAN]: 'Boolean (True/False)',
  [Comparator.DATE]: 'Date Match',
  [Comparator.IN]: 'In List',
  [Comparator.NOT_IN]: 'Not In List',
};

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

  hasFilters(filter: Filter | Filter[]): boolean {
    const filters = Array.isArray(filter) ? filter : [filter];
    let hasAll = true
    for (const c of filters) {
      const filterString = `${toSnakeCase(c.field).replace('.', '__')},${c.comparator},${c.value}`;
      hasAll &&= this.filters.includes(filterString)
    }
    return hasAll
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

  // static features: CRUDFeatures = {
  //   create: true,
  //   search: true,
  //   filter: true,
  //   sort: true,
  //   view: true,
  //   update: true,
  //   delete: true,
  //   bulk: true,
  //   export: true
  // };

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

@ModelProps({ name: 'Attachment' })
export class Attachment extends CRUDModel<Attachment> {
  static features: CRUDFeatures = {
    create: true,
    update: true,
    delete: true,
  }

  @ColumnProps({ order: 1 })
  attachmentType!: string

  @ColumnProps({ order: 6, hidden: true })
  attachmentTypeId!: string

  @ColumnProps({ order: 1 })
  attachmentTypeCategory!: string

  @ColumnProps({ order: 1, hidden: true })
  filePath!: string

  @ColumnProps({ order: 2 })
  title?: string

  @ColumnProps({ order: 3 })
  description!: string

  @ColumnProps({ order: 3 })
  memType!: string
}

export type AttachmentRequest = {
  attachmentTypeCategory: "", 
  description: "", 
  title: "", 
  file: {
    content: "", 
    name: "", 
    extension: "", 
    contentType: ""
  }
}

export abstract class AttachmentModel<T extends AttachmentModel<T>> extends CRUDModel<T> {

  static attachmentFileTypes = ['PNG', 'JPG', 'JPEG', 'PDF']
  static attachmentFileSize = '2MB'
  static attachmentTypeCategories = []

  async fetchAttachments(id: string | number, options: any, withSignedUrl: boolean): Promise<{itemCount: number, items: Attachment[]} | null> {
    const variables = { 
      [`${toCamelCase((this.constructor as typeof CRUDModel).getModelName())}Id`]: id || this.id 
    }
    if (this.api instanceof GraphQLApi) {
      return await (this.api as GraphQLApi).query(
                      `get${(this.constructor as typeof CRUDModel).getModelName()}Attachments`,
                      createQueryWithoutFilters(
                        variables,
                        `get${(this.constructor as typeof CRUDModel).getModelName()}Attachments`,
                        `itemCount items {
                          attachmentType
                          attachmentTypeCategory
                          attachmentTypeId
                          description
                          filePath
                          ${withSignedUrl ? 'signedUrl' : ''}
                          id
                          memType
                          title
                        }`,
                      ), 
                      variables,
                      options
                    )
    } else if (this.api instanceof RestApi) {
      // const result = await (this.api as RestApi).get(paginationParams) 
    }
    return {
      itemCount: 0,
      items: []
    }
  }
  
  async fetchSignedUrl(filePath: string, options: any): Promise<string | null> {
    const attachmentTypeNameClass = (this.constructor as typeof CRUDModel).getModelName()

    if (this.api instanceof GraphQLApi) {
      return await (activeApi as GraphQLApi).query(
        `download${attachmentTypeNameClass}Attachment`,
        createQueryWithoutFilters(
          { filePath: filePath },
          `download${attachmentTypeNameClass}Attachment`,
        ),
        { filePath: filePath },
        options,
      )
    } else if (this.api instanceof RestApi) {
      // const result = await (this.api as RestApi).get(paginationParams) 
    }
    return null
  }

  async uploadAttachment(id: string | number, attachmentPayload: Record<string, any>, options: any): Promise<boolean | null> {
    const attachmentTypeNameClass = (this.constructor as typeof CRUDModel).getModelName()
    const attachmentTypeNameCamel = toCamelCase(attachmentTypeNameClass)

    if (this.api instanceof GraphQLApi) {
      return await (activeApi as GraphQLApi).mutate(
        `upload${attachmentTypeNameClass}Attachment`,
        createAttachmentMutation(
          `upload${attachmentTypeNameClass}Attachment`,
          `${attachmentTypeNameCamel}Id`,
          `${attachmentTypeNameClass}Attachment`,
        ),
        attachmentPayload,
        options,
        { [`${attachmentTypeNameCamel}Id`]: id },
      )
                    
    } else if (this.api instanceof RestApi) {
      // const result = await (this.api as RestApi).get(paginationParams) 
    }
    return false
  }

  async deleteAttachment(attachmentId: string): Promise<boolean>{

    const attachmentTypeNameClass = (this.constructor as typeof CRUDModel).getModelName()
    const attachmentTypeNameCamel = toCamelCase(attachmentTypeNameClass)

    if (this.api instanceof GraphQLApi) {
      const response = await (activeApi as GraphQLApi).delete(
        `delete${attachmentTypeNameClass}Attachment`,
        deleteAttachmentMutation(`delete${attachmentTypeNameClass}Attachment`),
        undefined,
        {},
        { attachmentId },
      )

      return response.status
                    
    } else if (this.api instanceof RestApi) {
      // const result = await (this.api as RestApi).get(paginationParams) 
    }
    return false
  }
}

export abstract class FullCRUDModel<T extends FullCRUDModel<T>> extends AttachmentModel<T> {
  @ColumnProps({ order: 99 })
  evaluationStatus!: string

  // static features: CRUDFeatures = {
  //   create: true,
  //   search: true,
  //   filter: true,
  //   sort: true,
  //   view: true,
  //   update: true,
  //   delete: true,
  //   bulk: true,
  //   export: true
  // };

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