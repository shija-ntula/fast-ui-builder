import { ApiInterface } from '../interfaces/api';
export declare class GraphQLApi implements ApiInterface {
    private endpoint;
    constructor(endpoint: string);
    sendQuery(query: string, variables?: Record<string, any>): Promise<any>;
    get(resource: string, params?: any): Promise<any>;
    post(resource: string, data: any): Promise<any>;
    put(resource: string, data: any): Promise<any>;
    delete(resource: string, id: string | number): Promise<any>;
}
