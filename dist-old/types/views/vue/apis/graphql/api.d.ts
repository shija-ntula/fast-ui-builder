import { ApolloClient, DocumentNode } from '@apollo/client/core';
import { PaginationParams } from '../../models/crud-model';
import { ApiInterface } from '../../interfaces/api';
export declare class GraphQLApi implements ApiInterface {
    private client;
    constructor(client: ApolloClient);
    mutate(mutationName: string, mutation: DocumentNode, variables: Record<string, any>, options?: Record<string, any>): Promise<any>;
    query(queryName: string, query: DocumentNode, params?: PaginationParams, options?: Record<string, any>): Promise<any>;
}
