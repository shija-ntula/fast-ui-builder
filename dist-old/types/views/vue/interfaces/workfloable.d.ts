export declare class Workfloable {
    endpoint: string;
    static apiType: string;
    constructor(endpoint: string);
    getAll(): Promise<void>;
    create(data: any): Promise<void>;
}
