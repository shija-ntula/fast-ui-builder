import { ApiInterface } from '../interfaces/api';
export declare class RestApi implements ApiInterface {
    private baseUrl;
    constructor(baseUrl: string);
    get<T>(url: string, params?: any): Promise<T>;
    post<T>(url: string, body: any): Promise<T>;
    put<T>(url: string, body: any): Promise<T>;
    delete<T>(url: string, id: string | number): Promise<T>;
}
