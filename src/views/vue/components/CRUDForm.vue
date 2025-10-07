<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed, Component } from "vue";
import { BuiltInAction, type FormFieldDef } from "../../../utils/types";
import { type CRUDModel } from "src/models/crud-model";
import { enumToOptions } from "../../../utils/helpers";

// Define a generic interface for your props
interface Props<T extends CRUDModel<T>> {
  modelValue?: CRUDModel<T>;
}

// Use a default type if you don't know the specific type
type DefaultModel = any; // or use a base interface

// const props = defineProps<T extends CRUDModel<T>>();

const props = defineProps<{
  modelValue?: CRUDModel<any>;
  filters?: {field: string, comparator: string, value: string}[];
  textComponent?: Component;
  enumComponent?: Component;
  selectComponent?: Component;
  dateComponent?: Component;
  switchComponent?: Component;
  formComponent?: Component;
}>();

const fields = computed<FormFieldDef[]>(() => {
  return props.modelValue?.constructor.getFields(BuiltInAction.Create).filter((f: FormFieldDef) => !f.hidden) || [];
})

const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
  (e: "afterSubmit", value: Record<string, any>): void;
}>();

// make a reactive form state
const formState = ref<Record<string, any>>({});

// initialize state when props change
watch(
  () => props.modelValue,
  (val) => {
    formState.value = { ...(val?.toJson(BuiltInAction.Create) || {}) };
  },
  { immediate: true }
);

const getFieldFilter = (field: string) => {
  return props.filters?.filter(f => f.field === field);
}

const onInput = (field: string, value: any) => {
  formState.value[field] = value;
  emit("update:modelValue", formState.value);
};

const onSubmit = async () => {
  
  const result = formState.value.id?
                  await props.modelValue?.update(formState.value) 
                  : await props.modelValue?.create(formState.value)

  if (result && result.status) {
    emit("afterSubmit", formState.value);
  }
};
</script>

<template>
  <component :is="formComponent || 'form'" @submit.prevent="onSubmit">
    <div v-for="field in fields" :key="field.field">
      <!-- Text/Number/Date -->
      
      <div v-if="['text', 'textarea','number'].includes(field.type)" >
        <component 
          v-if="textComponent"
          :is="textComponent" 
          v-bind="{ 
            ...field, 
            placeholder: field.placeholder || `Enter ${field.label}`
          }"
          v-model="formState[field.field]"
        />
        <div v-else class="form-field">
          <label :for="field.field">{{ field.label }}</label>

          <!-- Text/Number/Date -->
          <input
            :id="field.field" v-model="formState[field.field]" 
            :placeholder="field.placeholder" 
            :required="field.required"
          />
        </div>
      </div>
      
      <div v-else-if="['enum'].includes(field.type) && field.resource" >
        <component 
          v-if="enumComponent"
          :is="enumComponent" 
          v-bind="{ 
            ...field, 
            placeholder: field.placeholder || `Select ${field.label}`
          }"
          v-model="formState[field.field]"
        />
        <div v-else class="form-field">
          <label :for="field.field">{{ field.label }}</label>
          <select
            :id="field.field" v-model="formState[field.field]" 
            :placeholder="field.placeholder" 
            :required="field.required"
          >
            <option v-for="entry in enumToOptions(field.resource)" :value="entry.value" :key="entry.value">{{ entry.label }}</option>
          </select>
        </div>
      </div>
      
      <div v-else-if="['select'].includes(field.type) && field.resource" >
        <component 
          v-if="selectComponent"
          :is="selectComponent" 
          v-bind="{ 
            ...field, 
            placeholder: field.placeholder || `Select ${field.label}`
          }"
          v-model="formState[field.field]"
          :default-filters="getFieldFilter(field.field)"
          :formValues="formState"
        />
        <div v-else class="form-field">
          <label :for="field.field">{{ field.label }}</label>
          <select
            :id="field.field" v-model="formState[field.field]" 
            :placeholder="field.placeholder" 
            :required="field.required"
          >
            <option v-for="entry in enumToOptions(field.resource)" :value="entry.value" :key="entry.value">{{ entry.label }}</option>
          </select>
        </div>
      </div>

      <div v-if="['date'].includes(field.type)" >
        <component 
          v-if="dateComponent"
          :is="dateComponent" 
          v-bind="{ 
            ...field, 
            placeholder: field.placeholder || `Choose ${field.label}`
          }"
          v-model="formState[field.field]"
        />
        <div v-else class="form-field">
          <label :for="field.field">{{ field.label }}</label>
          <input
            type="date"
            :id="field.field" v-model="formState[field.field]" 
            :placeholder="field.placeholder" 
            :required="field.required"
          />
        </div>
      </div>

      <div v-if="['switch'].includes(field.type)" >
        <component 
          v-if="switchComponent"
          :is="switchComponent" 
          v-bind="{ 
            ...field, 
            placeholder: field.placeholder
          }"
          v-model="formState[field.field]"
        />
        <div v-else class="form-field">
          <label :for="field.field">{{ field.label }}</label>
          <input
            type="checkbox"
            :id="field.field" v-model="formState[field.field]" 
            :placeholder="field.placeholder" 
            :required="field.required"
          />
        </div>
      </div>

    </div>
    <slot></slot>

    <!-- <button type="submit">Submit</button> -->
  </component>
</template>

<style scoped>
.form-field {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
}
input, select, textarea {
  width: 100%;
  padding: 0.5rem;
}
</style>