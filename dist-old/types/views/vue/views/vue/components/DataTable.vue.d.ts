import { ColumnDef, DynamicAction, Pagination } from '../../../utils/types';
import { DataTableTheme } from '../types';
type __VLS_Props = {
    theme?: DataTableTheme;
    title?: string;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    onFilter?: (filters: {
        field: string;
        comparator: string;
        value: string;
    }[]) => void;
    tableActions?: DynamicAction[];
    rowActions?: DynamicAction[];
    columns: ColumnDef[];
    rows: any[];
    showCount?: boolean;
    pagination?: Pagination;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<`header.${string}`, (_: {
        col: ColumnDef;
    }) => any>> & Partial<Record<`cell.${string}`, (_: {
        row: any;
    }) => any>> & {
        title?(_: {}): any;
        search?(_: {}): any;
        tableActions?(_: {
            actions: DynamicAction[];
        }): any;
        empty?(_: {}): any;
        pagination?(_: {
            pagination: Pagination;
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
