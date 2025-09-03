export interface ColumnDefOptions {
    field: string;
    hidden?: boolean;
    header?: string;
    headerClass?: string;
    rowClass?: string;
    order?: number;
    format?: (value: any) => string;
}
export type ColumnDef = string | ColumnDefOptions;
export type FieldPropsOptions = Omit<ColumnDefOptions, 'field'>;
export declare enum BuiltInAction {
    Create = "create",
    Update = "update",
    Delete = "delete",
    Export = "export"
}
export type DynamicModelAction = {
    label: string;
    icon?: string;
    class?: string;
    action: BuiltInAction;
};
export type DynamicAction = {
    label: string;
    icon?: string;
    class?: string;
    onClick: (data?: any) => void;
};
export type Pagination = {
    onPageChange(arg0: number): unknown;
    onPageSizeChange(newSize: number): unknown;
    page: number;
    pageSize: number;
    total: number;
};
