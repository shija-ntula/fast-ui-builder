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
  rowComponent?: Component;
  colComponent?: Component;
  textComponent?: Component;
  enumComponent?: Component;
  selectComponent?: Component;
  dateComponent?: Component;
  switchComponent?: Component;
  formComponent?: Component;
}>();

const rawFields = computed<FormFieldDef[]>(() => {
  return (props.modelValue?.constructor.getFields(
    props.modelValue?.id ? BuiltInAction.Update : BuiltInAction.Create
  ) || []);
})

const fields = computed<FormFieldDef[]>(() => {
  return rawFields.value.filter((f: FormFieldDef) => !f.hidden).map((f: FormFieldDef) => ({
            ...f,
            field: f.createField || f.field + (f.type === 'select' ? 'Id' : ''),
          }));
})

const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
  (e: "beforeSubmit", value: Record<string, any>): void;
  (e: "afterSubmit", value: boolean): void;
}>();

// make a reactive form state
const formState = ref<Record<string, any>>({});

function resolveDefaultValue(field: FormFieldDef, data: Record<string, any>): any {
  if(field.type === 'switch'){
    return false
  }
  
  let value = field.defaultValue;
  if (typeof value === "string" && value.startsWith("$self.")) {
    // Extract path after "$self."
    let path = value.replace("$self.", "");

    const fields = path.split(".");
    if(fields.length === 1){
      value = data[fields[0]]
    } else {
      const obj = data[fields[0]];
      fields.shift();

      value = fields.reduce((acc, field) => acc?.[field], obj);
    }
  }

  return value
}

// Patch data
watch(
  () => props.modelValue,
  (val) => {
    if(val){
      const data = val
      rawFields.value.forEach(f => {
        const fieldName = f.createField || f.field + (f.type === 'select' ? 'Id' : '')
        formState.value[fieldName] = data[f.field]
        
        if(f.type === 'switch' && typeof formState.value[fieldName] !== 'boolean'){
          formState.value[fieldName] = false
        }
        
        if(!formState.value[fieldName] && f.defaultValue){
          formState.value[fieldName] = resolveDefaultValue(f, data)
        }
        if(f.type === 'select' && formState.value[fieldName]){
          formState.value[fieldName] = Array.isArray(data[f.field])? 
                        data[f.field].map((d: any) => d.id) : data[f.field].id
        }
      })
    }
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
  // Ask parent to modify or validate form data before submit
  let dataToSubmit = { ...formState.value };

  // If parent listener returns something, use it
  const maybeModified = emit("beforeSubmit", dataToSubmit);

  // Vue emit doesn’t return a promise automatically; you can handle async parent
  // by letting the parent set up `@beforeSubmit` as an async listener returning a Promise.
  if (maybeModified instanceof Promise) {
    try {
      const result = await maybeModified;
      if (result && typeof result === 'object') {
        dataToSubmit = result;
      }
    } catch (err) {
      console.error("Error in beforeSubmit:", err);
      return; // stop submission
    }
  } else if (Array.isArray(maybeModified) && maybeModified[0]) {
    // Vue emits return an array of listener results
    const firstResult = maybeModified[0];
    if (firstResult && typeof firstResult === 'object') {
      dataToSubmit = firstResult;
    }
  } else if(maybeModified && typeof maybeModified === 'object'){
    dataToSubmit = maybeModified;
  }

  console.log("Modified form data:", maybeModified, dataToSubmit);

  // Now apply the possibly modified data
  formState.value = dataToSubmit;
  let result = null;

  try{
    // Submit to model
    result = formState.value.id
      ? await props.modelValue?.update(formState.value)
      : await props.modelValue?.create(formState.value);
  } finally {
    emit("afterSubmit", !!result?.status);
  }
};

const formId = `${props.modelValue?.constructor.getModelName() || "form"}-${Date.now()}`;

</script>

<template>
  <component 
    :is="formComponent || 'form'" 
    :id="formId"
    @submit.prevent="onSubmit"
  >
    <component 
      :is="rowComponent || 'div'" 
      :gridWidth="modelValue?.constructor.gridWidth || 12"
    >
      <component 
        v-for="field in fields" :key="field.field"
        :is="colComponent || 'div'"
        :gridWidth="modelValue?.constructor.gridWidth || 12"
        :grid="field.grid || 12"
      >
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
            :form-id="formId"
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

      </component>
    </component>
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