interface ApiInterface {
    get<T = any>(url: string, params?: any): Promise<T>;
    post<T = any>(url: string, body: any): Promise<T>;
    put<T = any>(url: string, body: any): Promise<T>;
    delete<T = any>(url: string, id: string | number): Promise<T>;
}

declare abstract class DataModel<T> {
    id: string | string;
    createdAt?: string;
    updatedAt?: string;
    toJson(): Record<string, any>;
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

declare class CRUDService<T extends DataModel<T>, C extends typeof DataModel = typeof DataModel> {
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

declare abstract class CRUDModel<T extends CRUDModel<T>> extends DataModel<T> {
    static features: CRUDFeatures;
    service: CRUDService<T, typeof CRUDModel>;
    constructor(api?: ApiInterface, endpoint?: string);
    fetchAll(paginationParams?: PaginationParams): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    update(data: Partial<T>): Promise<T>;
    delete(id: number | string): Promise<boolean>;
}
type SortOrder = "asc" | "desc";
interface Search {
    field: string;
    value: string;
}
interface Filter {
    field: string;
    comparator: string;
    value: any;
}
declare class PaginationParams {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: SortOrder;
    search?: Search;
    filters?: Filter[];
    constructor(init?: Partial<PaginationParams>);
}
declare const defaultParams: PaginationParams;

interface CRUDFeatures {
    create?: boolean;
    search?: boolean;
    filter?: boolean;
    sort?: boolean;
    view?: boolean;
    update?: boolean;
    delete?: boolean;
    bulk?: boolean;
    import?: boolean;
    export?: boolean;
    attachment?: boolean;
    workflow?: boolean;
}

interface ColumnDefOptions {
    field: string;
    hidden?: boolean;
    header?: string;
    headerClass?: string;
    rowClass?: string;
    order?: number;
    format?: (value: any) => string;
}
type ColumnDef = string | ColumnDefOptions;
type FieldPropsOptions = Omit<ColumnDefOptions, 'field'>;
declare enum BuiltInAction {
    Create = "create",
    Update = "update",
    Delete = "delete",
    Export = "export"
}
type DynamicModelAction = {
    label: string;
    icon?: string;
    class?: string;
    action: BuiltInAction;
};
type DynamicAction = {
    label: string;
    icon?: string;
    class?: string;
    onClick: (data?: any) => void;
};
type Pagination = {
    onPageChange(arg0: number): unknown;
    onPageSizeChange(newSize: number): unknown;
    page: number;
    pageSize: number;
    total: number;
};

declare const COLUMN_METADATA_KEY: unique symbol;
declare function FieldProps(options?: FieldPropsOptions): (target: any, propertyKey: string) => void;
declare function getFieldMetadata(modelClass: any): Record<string, FieldPropsOptions>;

declare class Attachable {
    endpoint: string;
    static apiType: string;
    constructor(endpoint: string);
    getAll(): Promise<void>;
    create(data: any): Promise<void>;
}

declare class Workfloable {
    endpoint: string;
    static apiType: string;
    constructor(endpoint: string);
    getAll(): Promise<void>;
    create(data: any): Promise<void>;
}

declare class RestApi implements ApiInterface {
    private baseUrl;
    constructor(baseUrl: string);
    get<T>(url: string, params?: any): Promise<T>;
    post<T>(url: string, body: any): Promise<T>;
    put<T>(url: string, body: any): Promise<T>;
    delete<T>(url: string, id: string | number): Promise<T>;
}

declare class GraphQLApi implements ApiInterface {
    private endpoint;
    constructor(endpoint: string);
    sendQuery(query: string, variables?: Record<string, any>): Promise<any>;
    get(resource: string, params?: any): Promise<any>;
    post(resource: string, data: any): Promise<any>;
    put(resource: string, data: any): Promise<any>;
    delete(resource: string, id: string | number): Promise<any>;
}

declare let activeApi: ApiInterface;
declare function setApi(api: ApiInterface): void;
declare function getApi(): ApiInterface;

export { Attachable, BuiltInAction, COLUMN_METADATA_KEY, type CRUDFeatures, CRUDModel, type ColumnDef, type ColumnDefOptions, DataModel, type DynamicAction, type DynamicModelAction, FieldProps, type FieldPropsOptions, GraphQLApi, type Pagination, PaginationParams, RestApi, Workfloable, activeApi, defaultParams, getApi, getFieldMetadata, setApi };
