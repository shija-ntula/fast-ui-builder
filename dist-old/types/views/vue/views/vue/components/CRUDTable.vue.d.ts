import { CRUDModel } from '../../../models/crud-model';
import { ColumnDef, DynamicAction } from '../../../utils/types';
import { DataTableTheme } from '../types';
type __VLS_Props = {
    theme?: DataTableTheme;
    resource: typeof CRUDModel;
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
    columns?: ColumnDef[];
    showCount?: boolean;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
