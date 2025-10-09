<script setup lang="ts">
import { ref, onMounted, defineProps, watch, reactive, computed } from 'vue';
import DataTable from './DataTable.vue';
import { defaultParams, PaginationParams, type CRUDModel } from '../../../models/crud-model';
import { BuiltInAction, ColumnDef, DynamicAction, Pagination } from '../../../utils/types';
import { debounce, toTitle } from '../../../utils/helpers';
import { get } from 'http';
import { DataTableTheme } from '../types';
import CRUDModal from './CRUDModal.vue';
import { baseUrl } from '../../../index';

const props = defineProps<{
  modelValue?: [];
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
  reload?: boolean;
  sortBy?: string;
  defaultFilters?: {field: string, comparator: string, value: string}[];
  onCreate?: (model: typeof props.resource) => void;
  onView?: (resource: typeof props.resource, id: string) => void;
  onUpdate?: (model: typeof props.resource) => void;
  onDelete?: (id: number | string) => void;
  getTemplate?: () => Promise<boolean>;
  importTemplate?: () => Promise<boolean>;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: []];
  "update:reload": [value: boolean];
  "onLoading": [loading: boolean, message?: string];
}>();

const reloadTable = computed(() => props.reload)

// Action callbacks
const onCreate = () => {
  if(props.onCreate){
    props.onCreate(new props.resource())
  }
}

const onView = (model: Record<string, any>) => {
  const instance = props.resource.fromJson(model)
  if(props.onView){
    props.onView(props.resource, model?.id)
  }
}

const onUpdate = (model: Record<string, any>) => {
  if(props.onUpdate){
    props.onUpdate(props.resource.fromJson(model))
  }
}

const onDelete = (model: Record<string, any>) => {
  if(props.onDelete){
    props.onDelete(props.resource.fromJson(model))
  }
}

const getTemplate = async () => {
  if(props.getTemplate){
    props.getTemplate()
  } else {
    emit("onLoading", true, "Downloading template...")
    await (new props.resource()).getTemplate()
    emit("onLoading", false, "Finished downloading template...")
  }
}

const importTemplate = async () => {
  if(props.importTemplate){
    await props.importTemplate()
  } else {
    // Create hidden input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*"; // optional: restrict types e.g. ".pdf,.docx,image/*"
    input.style.display = "none";

    // When user picks a file
    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;

      const file = target.files[0];
      console.log("Selected file:", file.name);

      // Prepare form data
      const formData = new FormData();
      formData.append("file", file);

      try {
        emit("onLoading", true, `Importing ${props.resource.getModelTitle()}...`)
        const imported = await (new props.resource()).importTemplate(formData);
        emit("onLoading", false, "Finished importing...")

        if(imported){
          emit("update:reload", true)
          fetchData()
        }

        console.log("Upload success:");
      } catch (error) {
        console.error("Upload error:", error);
      }
    };

    // Trigger file picker
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }
}

const actionHandlers: Record<string, (...args: any[]) => void> = {
  [BuiltInAction.Create]: onCreate,
  [BuiltInAction.View]: onView,
  [BuiltInAction.Update]: onUpdate,
  [BuiltInAction.Delete]: onDelete,
  [BuiltInAction.Template]: getTemplate,
  [BuiltInAction.Import]: importTemplate
};

const getTableActions = () => {
  const tableActions = []

  if (props.resource.features.import) {
    tableActions.push({label: 'Template', action: BuiltInAction.Template});
    tableActions.push({label: 'Import', action: BuiltInAction.Import});
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

  if (props.resource.features.view) {
    rowActions.push({label: 'View', onClick: actionHandlers[BuiltInAction.View]});
  }

  if (props.resource.features.update) {
    rowActions.push({label: 'Update', onClick: actionHandlers[BuiltInAction.Update]});
  }

  if (props.resource.features.delete) {
    rowActions.push({label: 'Delete', onClick: actionHandlers[BuiltInAction.Delete]});
  }

  if (props.resource.features.attachment) {
    rowActions.push(...[
      {label: 'Attach', onClick: actionHandlers[BuiltInAction.Create]},
      {label: 'Attachments', onClick: actionHandlers[BuiltInAction.Create]}
    ]);
  }
  
  if (props.resource.features.workflow) {
    rowActions.push(...[
      {label: 'Submit', onClick: actionHandlers[BuiltInAction.Create]},
      {label: 'Track', onClick: actionHandlers[BuiltInAction.Create]},
    ]);
  }

  if (props.resource.customActions) {
    rowActions.push(...props.resource.customActions);
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
    { label: action.label, icon: action.icon, class: action.class, onClick: (data: any) => action.onClick(data) }
  ))
);

const pagination = reactive<Pagination>({
  page: 1,
  pageSize: props.resource.features.pagination ? 10 : 100000000,
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

const paginationParams = reactive<PaginationParams>(new PaginationParams({
  ...defaultParams,
  page: pagination.page,
  pageSize: pagination.pageSize
}));

const filters = ref<{field: string, comparator: string, value: string}[]>([]);
const searchColumns = computed<string[]>(() => {
  return props.resource.features.search?
    props.resource.searchColumns()
    : []
});

watch(
  [() => props.defaultFilters, filters],
  ([newDefaultFilters, newFilters], [oldDefaultFilters, oldFilters]) => {
    
    // do something when either changes
    fetchData()
  }
)

const preparePagination = () => {
  paginationParams.filters = []
  paginationParams.addFilters(props.defaultFilters || [])
  paginationParams.addFilters(filters.value)
  paginationParams.sortBy = props.sortBy
}

let currentRequest = 0;

async function fetchData() {
  if (!props.resource) return;
  const requestId = ++currentRequest;
  emit("onLoading", true, "Fetching Data...")
  try {
    preparePagination()

    const instance = new props.resource();
    const data = await instance.fetchAll(paginationParams);

    if (requestId !== currentRequest) return; // stale request, ignore

    if(Array.isArray(data?.items)){
      dataItems.value = data.items;
      pagination.total = data.itemCount;

      emit("update:modelValue", data.items)
    }

  } finally {
    if (requestId === currentRequest) {
      emit("onLoading", false)
    }
  }
}

const lastSearchTime = Date.now()

const search = debounce((query: string) => {
  paginationParams.searchColumns = []
  paginationParams.addSearchColumn(searchColumns.value)
  paginationParams.searchQuery = query
  fetchData()
}, 500)

const filter = (filters: {field: string, comparator: string, value: string}[]) => {
  paginationParams.addFilters(filters);
  fetchData();
}

// Fetch data on mount
onMounted(fetchData);

// Re-fetch if resource changes dynamically
watch(() => props.resource, fetchData);

// Re-fetch if reload  is true
watch(() => props.reload, async (val) => {
  if (val) {
    emit("update:reload", false)
    await fetchData();
  }
});

// Modal
const isModalOpen = ref(false);
const customTheme = {
  components: {
    modal: 'article',
    header: 'header',
    title: 'h1',
    closeButton: 'span'
  },
  classes: {
    wrapper: 'custom-modal-wrapper',
    modal: 'custom-modal',
    header: 'custom-modal-header',
    title: 'custom-modal-title',
    closeButton: 'custom-close-btn',
    body: 'custom-modal-body',
    footer: 'custom-modal-footer'
  }
};


</script>

<template>
  <div>
    <DataTable
      :theme="props.theme"
      :title="props.title === undefined? `${props.resource.getModelTitle()} List` : props.title"
      :searchPlaceholder="props.searchPlaceholder"
      :onSearch="searchColumns.length? props.onSearch || search : undefined"
      :onFilter="props.resource.features.filter? props.onFilter || filter : undefined"
      :tableActions="tableActions"
      :rowActions="rowActions"
      :columns="columns"
      :pagination="props.resource.features.pagination? pagination : undefined"
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
