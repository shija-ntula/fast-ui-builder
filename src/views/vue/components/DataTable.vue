<script setup lang="ts">
import { ref, watch } from 'vue';
import { ColumnDef, DynamicAction, Pagination } from "../../../utils/types";
import { DataTableTheme } from '../types';
import { fieldValue } from '../../../utils/helpers';

const props = defineProps<{
  theme?: DataTableTheme;
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: (filters: {field: string, comparator: string, value: string}[]) => void;
  isLoading?: boolean;
  tableActions?: DynamicAction[];
  rowActions?: DynamicAction[];
  columns: ColumnDef[];
  rows: any[];
  showCount?: boolean;
  pagination: Pagination;
}>();

const searchQuery = ref('');

watch(searchQuery, (value) => {
  props.onSearch?.(value);
});

// 🔎 Column filter state
const filters = ref<{field: string, comparator: string, value: string}[]>([]);
const showFilterPopup = ref(false);
const filterValue = ref("");
const activeColumnIndex = ref<number | null>(null);
const popupStyle = ref<{ top: string; left: string }>({ top: "0px", left: "0px" });

function openFilterPopup(event: MouseEvent, colIndex: number, field: string) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  popupStyle.value = {
    top: rect.top - 45 + window.scrollY + "px",
    left: rect.left + "px",
  };

  activeColumnIndex.value = colIndex;
  filterValue.value = filters.value.find(f => f.field === field)?.value || "";
  showFilterPopup.value = true;
}

function applyFilter(field: string) {
  if (props.onFilter) {
    const existing = filters.value.find(f => f.field === field);

    if (existing) {
      existing.value = filterValue.value;
    } else {
      filters.value.push({ field, comparator: "equals", value: filterValue.value });
    }

    showFilterPopup.value = false;
    props.onFilter(filters.value);
  }
}

const hasFilter = (field: string) => filters.value.some(f => f.field === field);

function clearFilter(field: string) {
  if (props.onFilter) {
    filters.value = filters.value.filter(f => f.field !== field);
    props.onFilter(filters.value);
  }
}

</script>

<template>
  <component :is="theme?.components?.wrapper || 'div'" :class="theme?.classes?.wrapper || 'datatable-wrapper'">
    
    <!-- Title -->
    <div v-if="title" :class="theme?.classes?.title || 'datatable-title'">
      <slot name="title">{{ title }}</slot>
    </div>

    <component :is="theme?.components?.headerWrapper || 'div'" :class="theme?.classes?.headerWrapper || ''">
      <!-- Search -->
      <component :is="theme?.components?.searchWrapper || 'div'" v-if="onSearch" :class="theme?.classes?.searchWrapper || 'datatable-search-wrapper'">
        <slot name="search">
          <component
            :is="theme?.components?.searchInput || 'input'"
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder || 'Search...'"
            :class="theme?.classes?.searchInput || 'datatable-search'"
          />
        </slot>
      </component>

      <!-- Global Actions -->
      <component :is="theme?.components?.actionsWrapper || 'div'" v-if="tableActions?.length" :class="theme?.classes?.actionsWrapper || 'datatable-actions'">
        <slot name="tableActions" :actions="tableActions">
          <component
            v-for="(action, i) in tableActions"
            :is="theme?.components?.button || 'button'"
            :key="i"
            :class="action.class || theme?.classes?.button || 'datatable-action-btn'"
            @click="action.onClick"
          >
            {{ action.label }}
          </component>
        </slot>
      </component>
    </component>

    <!-- Table -->
    <component :is="theme?.components?.table || 'table'" :class="theme?.classes?.table || 'datatable-table'">
      <component :is="theme?.components?.thead || 'thead'" :class="theme?.classes?.thead">
        <component :is="theme?.components?.headerRow || 'tr'" :class="theme?.classes?.headerRow || 'datatable-header-row'">
          <component
            :is="theme?.components?.headerCell || 'th'"
            v-if="showCount"
            :class="theme?.classes?.headerCell || 'datatable-header-cell'"
          >
            S/N
          </component>
          <component
            :is="theme?.components?.headerCell || 'th'"
            v-for="(col, i) in columns"
            :key="i"
            :class="typeof col === 'string' ? theme?.classes?.headerCell || 'datatable-header-cell' : col.headerClass || theme?.classes?.headerCell || 'datatable-header-cell'"
          >
            <slot :name="`header.${typeof col === 'string' ? col : col.field}`" :col="col">
              {{ typeof col === 'string' ? col : col.header || col.field }}
            </slot>
          </component>
          <component
            :is="theme?.components?.headerCell || 'th'"
            v-if="rowActions?.length"
            :class="theme?.classes?.headerCell || 'datatable-header-cell'"
            style="text-align: end;"
          >
            Actions
          </component>
        </component>
      </component>

      <component :is="theme?.components?.tbody || 'tbody'" :class="theme?.classes?.tbody">
        <component
          :is="theme?.components?.row || 'tr'"
          v-if="rows?.length > 0"
          v-for="(row, rIndex) in rows"
          :key="rIndex"
          :class="theme?.classes?.row || 'datatable-body-row'"
        >
          <component
            :is="theme?.components?.cell || 'td'"
            v-if="showCount"
            :class="theme?.classes?.cell || 'datatable-body-cell'"
          >
            {{ (pagination.pageSize * (pagination.page - 1)) + (rIndex + 1) }}
          </component>
          <component
            :is="theme?.components?.cell || 'td'"
            v-for="(col, cIndex) in columns"
            :key="cIndex"
            :class="typeof col === 'string' ? theme?.classes?.cell || 'datatable-body-cell' : col.rowClass || theme?.classes?.cell || 'datatable-body-cell'"
          >
            <slot :name="`cell.${typeof col === 'string' ? col : col.field}`" :row="row">
              {{
                fieldValue(col, row)
              }}
            </slot>
          </component>
          <component
            :is="theme?.components?.cell || 'td'"
            v-if="rowActions?.length"
            :class="theme?.classes?.cell || 'datatable-body-cell'"
            style="text-align: end;"
          >
            <!-- <slot name="actions" :row="row"> -->
            <component
              v-if="theme?.components?.rowActions"
              :is="theme?.components?.rowActions"
              :actions="rowActions"
              :data="row"
            />
            <component
              v-else
              v-for="(action, i) in rowActions"
              :is="theme?.components?.button || 'button'"
              :key="i"
              :class="action.class || theme?.classes?.button || 'datatable-action-btn'"
              @click="action.onClick(row)"
            >
              {{ action.label }}
            </component>
            <!-- </slot> -->
          </component>
        </component>
        <component :is="theme?.components?.row || 'tr'" v-else>
          <component :is="theme?.components?.cell || 'td'" :colspan="columns.length + Number(showCount) + Number(rowActions?.length)" class="text-center">
            <slot name="empty">No Data</slot>
          </component>
        </component>
      </component>
    </component>

    <!-- Pagination -->
    <div v-if="pagination" :class="theme?.classes?.paginationWrapper || 'datatable-pagination'">
      <component
        v-if="theme?.components?.pagination"
        :is="theme?.components?.pagination"
        :class="theme?.classes?.paginationWrapper || 'datatable-pagination'"
        :pagination="pagination"
      />

      <div v-else>
        <div :class="theme?.classes?.pageSize || 'datatable-page-size'">
          <label>Rows per page: </label>
          <component
            :is="theme?.components?.select || 'select'"
            :value="pagination.pageSize"
            @change="pagination.onPageSizeChange?.(parseInt(($event.target as HTMLSelectElement).value))"
            :class="theme?.classes?.select"
          >
            <option v-for="size in [5, 10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
          </component>
        </div>
        <div :class="theme?.classes?.pageControls || 'datatable-page-controls'">
          <component
            :is="theme?.components?.button || 'button'"
            :disabled="pagination.page === 1"
            @click="pagination.onPageChange?.(pagination.page - 1)"
          >
            Prev
          </component>
          <span>Page {{ pagination.page }} of {{ Math.ceil(pagination.total / pagination.pageSize) }}</span>
          <component
            :is="theme?.components?.button || 'button'"
            :disabled="pagination.page >= Math.ceil(pagination.total / pagination.pageSize)"
            @click="pagination.onPageChange?.(pagination.page + 1)"
          >
            Next
          </component>
        </div>
      </div>
    </div>

  </component>
</template>



<style scoped>
.datatable-wrapper { overflow-x: auto; width: 100%; }
.datatable-table { width: 100%; border-collapse: collapse; }
.datatable-header-row { background: #2d3e50; color: white; }
.datatable-header-cell { padding: 0.5rem 1rem; border-bottom: 2px solid #444; text-align: left; }
.datatable-body-row:nth-child(even) { background: #f7f7f7; }
.datatable-body-row:hover { background: #e2e2e2; }
.datatable-body-cell { padding: 0.5rem 1rem; border-bottom: 1px solid #ddd; }
.datatable-empty-body-cell { text-align: center; padding: 0.5rem 1rem; border-bottom: 1px solid #ddd; }

.datatable-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
.datatable-search-wrapper { margin-bottom: 0.5rem; }
.datatable-search { padding: 0.5rem; width: 200px; }

.datatable-filter-popup {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 6px;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.datatable-filterable {
  cursor:zoom-in;   /* makes it feel clickable */
  position: relative;
}

.datatable-filterable:hover {
  background: #3b4a61; /* subtle highlight on hover */
}

.datatable-clear-btn {
  cursor: pointer;
  font-size: 12px;
  margin-left: 5px;
  color: red;
}

.datatable-actions { margin-bottom: 0.5rem; }
.datatable-action-btn { margin-right: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; }
</style>
