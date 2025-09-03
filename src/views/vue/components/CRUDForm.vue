<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import type { FormFieldDef } from "../../../utils/types";

const props = defineProps<{
  fields: FormFieldDef[];
  modelValue?: Record<string, any>; // initial data for update
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
  (e: "submit", value: Record<string, any>): void;
}>();

// make a reactive form state
const formState = ref<Record<string, any>>({});

// initialize state when props change
watch(
  () => props.modelValue,
  (val) => {
    formState.value = { ...(val || {}) };
  },
  { immediate: true }
);

const onInput = (field: string, value: any) => {
  formState.value[field] = value;
  emit("update:modelValue", formState.value);
};

const onSubmit = () => {
  emit("submit", formState.value);
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div v-for="field in fields" :key="field.field" class="form-field">
      <label :for="field.field">{{ field.label }}</label>

      <!-- Text/Number/Date -->
      <input
        v-if="['text','number','date'].includes(field.type)"
        :id="field.field"
        :type="field.type"
        v-model="formState[field.field]"
        :placeholder="field.placeholder"
        :required="field.required"
      />

      <!-- Textarea -->
      <textarea
        v-else-if="field.type === 'textarea'"
        :id="field.field"
        v-model="formState[field.field]"
        :placeholder="field.placeholder"
        :required="field.required"
      ></textarea>

      <!-- Checkbox -->
      <input
        v-else-if="field.type === 'checkbox'"
        type="checkbox"
        :id="field.field"
        v-model="formState[field.field]"
      />

      <!-- Select -->
      <select
        v-else-if="field.type === 'select'"
        :id="field.field"
        v-model="formState[field.field]"
        :required="field.required"
      >
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <button type="submit">Submit</button>
  </form>
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