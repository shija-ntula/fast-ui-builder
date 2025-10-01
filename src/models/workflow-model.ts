// import { FormWapper, CRUDFeatures, GraphQLApi, RestApi, CRUDModel, PaginationParams, defaultParams, ColumnProps } from '../index'
import { CRUDFeatures } from '../interfaces/crud-features';
import { createQueryWithFilters, getGraphQLFields, getMutationSchema } from '../apis/graphql/schemas';
import { CRUDModel, defaultParams, PaginationParams } from './crud-model';
import { ColumnProps } from './decorators';
import { FormWapper } from '../utils/types';
import { GraphQLApi } from '../apis/graphql/api';
import { RestApi } from '../apis/rest/api';

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