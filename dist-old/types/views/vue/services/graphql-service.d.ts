import { ApiInterface } from '../interfaces/api';
export declare class GraphqlService {
    private endpoint;
    private Model;
    private api;
    constructor(endpoint: string, Model: C & (new () => T), api: ApiInterface);
    list(params?: any): Promise<T[]>;
    get(id: string): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(data: Partial<T>): Promise<T>;
    delete(id: number | string): Promise<boolean>;
}
