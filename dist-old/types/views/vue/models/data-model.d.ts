export declare abstract class DataModel<T> {
    id: string | string;
    createdAt?: string;
    updatedAt?: string;
    toJson(): Record<string, any>;
    getGraphqlFields(): string;
    static fromJson<T extends DataModel<T>>(this: new () => T, json: any): T;
    getEndpoint(): string;
    static getModelTitle(): string;
    static getModelTitlePlural(): string;
    static getColumns(): {
        field: string;
        header: string;
        hidden: boolean | undefined;
        order: number | undefined;
        headerClass: string | undefined;
        rowClass: string | undefined;
        format: ((value: any) => string) | undefined;
    }[];
}
