<script setup lang="ts">
import { ref, onMounted, defineProps, watch, reactive } from 'vue';
import DataTable from './DataTable.vue';
import { defaultParams, PaginationParams, type CRUDModel } from '../../../models/crud-model';
import { BuiltInAction, ColumnDef, DynamicAction, Pagination } from '../../../utils/types';
import { toTitle } from '../../../utils/helpers';
import { get } from 'http';
import { DataTableTheme } from '../types';

const props = defineProps<{
  theme?: DataTableTheme;
  resource: typeof CRUDModel;
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: (filters: {field: string, comparator: string, value: string}[]) => void;
  tableActions?: DynamicAction[];
  rowActions?: DynamicAction[];
  columns?: ColumnDef[];
  showCount?: boolean;
  onLoading?: (isLoading: boolean) => void;
}>();

const loading = ref(true);

watch(loading, (val) => {
  if(props.onLoading)
    props.onLoading(val);
});

// Action callbacks
const onCreate = () => {
  alert('Create');
}

const onUpdate = (model: typeof props.resource) => {
  alert('Update');
}

const onDelete = (id: number | string) => {
  alert('Delete');
}

const actionHandlers: Record<string, (...args: any[]) => void> = {
  [BuiltInAction.Create]: onCreate,
  [BuiltInAction.Update]: onUpdate,
  [BuiltInAction.Delete]: onDelete
};

const getTableActions = () => {
  const tableActions = []

  if (props.resource.features.import) {
    tableActions.push({label: 'Template', action: BuiltInAction.Create});
    tableActions.push({label: 'Import', action: BuiltInAction.Create});
  }

  if (props.resource.features.export) {
    tableActions.push({label: 'Export PDF', action: BuiltInAction.Create});
    tableActions.push({label: 'Export CSV', action: BuiltInAction.Create});
    tableActions.push({label: 'Export XLS', action: BuiltInAction.Create});
  }

  if (props.resource.features.attachment) {
    tableActions.push({label: 'Attachments', action: BuiltInAction.Create});
  }
  
  if (props.resource.features.workflow) {
    tableActions.push({label: 'Workflow', action: BuiltInAction.Create});
  }

  if (props.resource.features.create) {
    tableActions.push({label: 'Create', action: BuiltInAction.Create});
  }

  return tableActions
}

const getRowActions = () => {
  const rowActions = []

  if (props.resource.features.update) {
    rowActions.push({label: 'Update', action: BuiltInAction.Update});
  }

  if (props.resource.features.delete) {
    rowActions.push({label: 'Delete', action: BuiltInAction.Delete});
  }

  if (props.resource.features.attachment) {
    rowActions.push(...[
      {label: 'Attach', action: BuiltInAction.Create},
      {label: 'Attachments', action: BuiltInAction.Create}
    ]);
  }
  
  if (props.resource.features.workflow) {
    rowActions.push(...[
      {label: 'Submit', action: BuiltInAction.Create},
      {label: 'Track', action: BuiltInAction.Create},
    ]);
  }

  return rowActions
}

const dataItems = ref<any[]>([]);
const columns = ref<ColumnDef[]>(props.columns || props.resource.getColumns());
const tableActions = ref(
  [
    ...getTableActions(),
    ...(props.tableActions || [])
  ].map((action) => (
    { label: action.label, onClick: () => actionHandlers[action.action]() }
  ))
);

const rowActions = ref(
  [
    ...getRowActions(),
    ...(props.rowActions || [])
  ].map((action) => (
    { label: action.label, onClick: () => actionHandlers[action.action]() }
  ))
);

const pagination = reactive<Pagination>({
  page: 1,
  pageSize: 10,
  total: 0,
  onPageChange(page: number) {
    pagination.page = page;
    paginationParams.page = page;
    fetchData();
  },
  onPageSizeChange(pageSize: number) {
    pagination.pageSize = pageSize;
    paginationParams.pageSize = pageSize;
    pagination.page = 1;
    paginationParams.page = 1;
    fetchData();
  }
})

const paginationParams = reactive<PaginationParams>({
  ...defaultParams,
  page: pagination.page,
  pageSize: pagination.pageSize
});

async function fetchData() {
  if (!props.resource) return;
  loading.value = true;
  try {
    const instance = new props.resource();
    const { items, itemCount} = await instance.fetchAll(paginationParams);

    dataItems.value = items;
    pagination.total = itemCount;

  } finally {
    loading.value = false;
  }
}

const search = (query: string) => {
  paginationParams.search = {
    field: 'name',
    value: query
  };
  fetchData();
}

const filter = (filters: {field: string, comparator: string, value: string}[]) => {
  paginationParams.filters = filters;
  fetchData();
}

// Fetch data on mount
onMounted(fetchData);

// Re-fetch if resource changes dynamically
watch(() => props.resource, fetchData);
</script>

<template>
  <div>
    <!-- <div v-if="loading" class="datatable-loading">Loading...</div> -->
    <DataTable
      :theme="props.theme"
      :title="props.title === undefined? `${props.resource.getModelTitle()} List` : props.title"
      :searchPlaceholder="props.searchPlaceholder"
      :onSearch="props.resource.features.search? props.onSearch || search : undefined"
      :onFilter="props.resource.features.filter? props.onFilter || filter : undefined"
      :tableActions="tableActions"
      :rowActions="rowActions"
      :columns="columns"
      :pagination="pagination"
      :show-count="props.showCount === undefined? true : props.showCount"
      :rows="dataItems"
    />
  </div>
</template>

<style scoped>
.datatable-loading {
  padding: 1rem;
  text-align: center;
  font-weight: bold;
}
</style>
