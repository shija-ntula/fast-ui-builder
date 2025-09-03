export declare class Attachable {
    endpoint: string;
    static apiType: string;
    constructor(endpoint: string);
    getAll(): Promise<void>;
    create(data: any): Promise<void>;
}
