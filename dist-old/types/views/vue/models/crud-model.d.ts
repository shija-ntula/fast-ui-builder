import { ApiInterface } from '../interfaces/api';
import { DataModel } from './data-model';
import { CRUDService } from '../services/crud-service';
import { CRUDFeatures } from '../index';
export declare abstract class CRUDModel<T extends CRUDModel<T>> extends DataModel<T> {
    static features: CRUDFeatures;
    service: CRUDService<T, typeof CRUDModel>;
    api: ApiInterface;
    constructor(api?: ApiInterface, endpoint?: string);
    fetchAll(paginationParams: PaginationParams | undefined, options: any): Promise<T[]>;
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
export declare class PaginationParams {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: SortOrder;
    search?: Search;
    filters?: Filter[];
    constructor(init?: Partial<PaginationParams>);
}
export declare const defaultParams: PaginationParams;
export {};
