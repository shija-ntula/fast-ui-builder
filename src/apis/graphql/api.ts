import { ApolloClient, DocumentNode } from "@apollo/client/core";
import { defaultParams, PaginationParams } from '../../models/crud-model';
import { ApiInterface } from '../../interfaces/api';

export class GraphQLApi implements ApiInterface {
  
  constructor(private client: ApolloClient) {}

  async mutate(
    mutationName: string,
    mutation: DocumentNode,
    variables: Record<string, any>,
    options?: Record<string, any>
  ) {
    try {
      const { data } = await this.client.mutate<any>({
        mutation: mutation,
        variables: { inputData: variables },
        context: {
          ...options
        }
      });

      return data[mutationName];
    } catch (error) {
      console.error("GraphQL error:", error);
      throw error;
    }
  }
  
  async delete(
    mutationName: string,
    mutation: DocumentNode,
    id: string | number,
    options?: Record<string, any>
  ) {
    try {
      const { data } = await this.client.mutate<any>({
        mutation: mutation,
        variables: { id },
        context: {
          ...options
        }
      });

      return data[mutationName];
    } catch (error) {
      console.error("GraphQL error:", error);
      throw error;
    }
  }

  async query(
    queryName: string,
    query: DocumentNode, 
    params: any = defaultParams,
    options: Record<string, any> = {},
  ) {
    try {
      const { data } = await this.client.query<any>({
        query: query,
        variables: { ...params },
        fetchPolicy: "network-only",
        context: {
          ...options
        }
      });
      
      return data[queryName].data;
    } catch (error) {
      console.error("GraphQL error:", error);
      throw error;
    }
  }

  async queryById(
    queryName: string,
    query: DocumentNode, 
    id: string | number,
    options: Record<string, any> = {},
  ) {
    try {
      const { data } = await this.client.query<any>({
        query: query,
        variables: { id },
        fetchPolicy: "network-only",
        context: {
          ...options
        }
      });
      
      return data[queryName].data;
    } catch (error) {
      console.error("GraphQL error:", error);
      throw error;
    }
  }
}
