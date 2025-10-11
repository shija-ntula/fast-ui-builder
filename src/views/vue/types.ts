import { Component } from "vue";

export type DataTableComponents = {
  wrapper?: string | Component;
  table?: string | Component;
  thead?: string | Component;
  tbody?: string | Component;
  row?: string | Component;
  headerRow?: string | Component;
  headerCell?: string | Component;
  cell?: string | Component;
  headerWrapper?: string | Component;
  filters?: string | Component;
  searchWrapper?: string | Component;
  actionsWrapper?: string | Component;
  rowActions?: string | Component;
  searchInput?: string | Component;
  button?: string | Component;
  select?: string | Component;
  pagination?: string | Component;
};

export type DataTableClasses = {
    wrapper?: string;
    title?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    row?: string;
    headerRow?: string;
    headerCell?: string;
    cell?: string;
    headerWrapper?: string;
    searchWrapper?: string;
    searchInput?: string;
    actionsWrapper?: string;
    button?: string;
    select?: string;
    paginationWrapper?: string;
    pageSize?: string;
    pageControls?: string;
};

export type DataTableTheme = {
  classes?: DataTableClasses;
  components?: DataTableComponents;
};

export type ModalTheme = {
  components?: {
    wrapper?: string | object;
    overlay?: string | object;
    content?: string | object;
    header?: string | object;
    title?: string | object;
    body?: string | object;
    footer?: string | object;
    button?: string | object;
  };
  classes?: {
    wrapper?: string;
    overlay?: string;
    content?: string;
    header?: string;
    title?: string;
    body?: string;
    footer?: string;
    button?: string;
  };
}

export type ModalProps = {
  theme?: ModalTheme;
  modelValue?: boolean;
  title?: string;
  closeable?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  maxWidth?: string;
  persistent?: boolean;
  showCloseButton?: boolean;
  zIndex?: number;
}