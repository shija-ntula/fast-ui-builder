import { Component } from "vue";

export interface ModelDefOptions {
  name: string;
  endpoint?: string;
  title?: string;
  titlePlural?: string;
}

export interface ColumnDefOptions {
  field: string;
  modelField?: string;
  hidden?: boolean;
  computed?: boolean;
  header?: string;
  displayFields?: string[];
  headerClass?: string;
  rowClass?: string;
  order?: number;
  enum?: Record<string, string | number>;
  format?: Function | undefined;
  component?: Component;
  formatHtml?: Function | undefined;
}

export interface FormFieldDef {
  field: string;
  label?: string;
  displayFields?: string[];
  type: "text" | "number" | "select" | "date" | "textarea" | "checkbox" | "switch";
  createField?: string;
  grid?: number;
  hidden?: boolean;
  required?: boolean;
  noCreate?: boolean;
  noUpdate?: boolean;
  resource?: any; // for selects
  placeholder?: string;
  options?: any;
  format?: Function | undefined;
}

// Allow also just a field name
export type ColumnDef = string | ColumnDefOptions;

export type ColumnPropsOptions = Omit<ColumnDefOptions, 'field'>;
export type FieldPropsOptions = Omit<FormFieldDef, 'field'>;

export enum BuiltInAction {
  Create = 'create',
  View = 'view',
  Update = 'update',
  Delete = 'delete',
  Template = 'template',
  Import = 'import',
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