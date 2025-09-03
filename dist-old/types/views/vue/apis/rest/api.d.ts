import { ApiInterface } from '../../interfaces/api';
export declare class RestApi implements ApiInterface {
    private baseUrl;
    constructor(baseUrl: string);
    create(data: any): Promise<any>;
}
