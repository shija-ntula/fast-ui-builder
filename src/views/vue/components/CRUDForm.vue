<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed, Component } from "vue";
import { BuiltInAction, type FormFieldDef } from "../../../utils/types";
import { type CRUDModel } from "src/models/crud-model";

// Define a generic interface for your props
interface Props<T extends CRUDModel<T>> {
  modelValue?: CRUDModel<T>;
}

// Use a default type if you don't know the specific type
type DefaultModel = any; // or use a base interface

// const props = defineProps<T extends CRUDModel<T>>();

const props = defineProps<{
  modelValue?: CRUDModel<any>;
  textComponent?: Component;
  formComponent?: Component;
}>();

const fields = computed<FormFieldDef[]>(() => {
  console.log("FIELDS",props.modelValue?.constructor.getFields(BuiltInAction.Create))
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

const onInput = (field: string, value: any) => {
  formState.value[field] = value;
  emit("update:modelValue", formState.value);
};

const onSubmit = async () => {
  console.log(formState.value)
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
      
      <div v-if="['text','number','date'].includes(field.type)" >
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
    </div>
    <!-- <div v-for="field in fields" :key="field.field" class="form-field"> -->
      
      <!-- <input
        v-if="['text','number','date'].includes(field.type)"
        :id="field.field"
        :type="field.type"
        v-model="formState[field.field]"
        :placeholder="field.placeholder"
        :required="field.required"
      /> -->

      <!-- Textarea -->
      <!-- <textarea
        v-else-if="field.type === 'textarea'"
        :id="field.field"
        v-model="formState[field.field]"
        :placeholder="field.placeholder"
        :required="field.required"
      ></textarea> -->

      <!-- Checkbox -->
      <!-- <input
        v-else-if="field.type === 'checkbox'"
        type="checkbox"
        :id="field.field"
        v-model="formState[field.field]"
      /> -->

      <!-- Select -->
      <!-- <select
        v-else-if="field.type === 'select'"
        :id="field.field"
        v-model="formState[field.field]"
        :required="field.required"
      >
        <option v-for="opt in field.options" :key="opt" :value="opt">
          {{ opt.label }}
        </option>
      </select> -->
    <!-- </div> -->

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