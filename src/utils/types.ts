
export interface ColumnDefOptions {
  field: string;
  hidden?: boolean;
  header?: string;
  headerClass?: string;
  rowClass?: string;
  order?: number;
  enum?: Record<string, string | number>;
  format?: (value: any) => string;
}

export interface FormFieldDef {
  field: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea" | "checkbox";
  required?: boolean;
  noCreate?: boolean;
  noUpdate?: boolean;
  options?: { label: string; value: any }[]; // for selects
  placeholder?: string;
}

// Allow also just a field name
export type ColumnDef = string | ColumnDefOptions;

export type ColumnPropsOptions = Omit<ColumnDefOptions, 'field'>;
export type FieldPropsOptions = Omit<FormFieldDef, 'field'>;

export enum BuiltInAction {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
  Export = 'export'
}

export enum FormWapper {
  MODAL = 'modal',
  PAGE = 'page'
}

export type DynamicModelAction = { 
  label: string, 
  icon?: string; 
  class?: string; 
  action: BuiltInAction; }

export type DynamicAction = { 
  label: string, 
  icon?: string; 
  class?: string; 
  onClick: (data?: any) => void; }

export type Pagination = {
  onPageChange(arg0: number): unknown;
  onPageSizeChange(newSize: number): unknown;
  page: number;
  pageSize: number;
  total: number;
}