<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { ModalTheme } from "../types";

const props = defineProps<{
  theme?: ModalTheme; 
  title?: string;
  modelValue: false,
  closeable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  maxWidth: "500px",
  persistent: false,
  showCloseButton: true,
  zIndex: 50,
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
  open: [];
  "before-close": [];
}>();

const isOpen = ref<boolean>(props.modelValue);
const isVisible = ref(false);

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (
    event.key === "Escape" &&
    props.closeOnEscape &&
    props.closeable &&
    !props.persistent
  ) {
    closeModal();
  }
};

// Watch for modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      openModal();
    } else {
      closeModal();
    }
  }
);

// Open modal with animation
const openModal = () => {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    isVisible.value = true;
    emit("open");
  }, 10);
};

// Close modal with animation
const closeModal = () => {
  if (!props.closeable && !props.persistent) return;

  emit("before-close");
  isVisible.value = false;

  setTimeout(() => {
    isOpen.value = false;
    document.body.style.overflow = "";
    emit("update:modelValue", false);
    emit("close");
  }, 300);
};

// Handle backdrop click
const handleBackdropClick = (event: MouseEvent) => {
  if (props.closeOnBackdrop && props.closeable && !props.persistent) {
    if ((event.target as HTMLElement).classList.contains("modal-backdrop")) {
      closeModal();
    }
  }
};

// Initialize and cleanup
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  if (props.modelValue) {
    openModal();
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});

// Expose methods for programmatic control
defineExpose({
  open: openModal,
  close: closeModal,
  isOpen,
});
</script>

<template>
  <teleport to="body">
    <component
      :is="theme?.components?.wrapper || 'div'"
      v-if="isOpen"
      :class="theme?.classes?.wrapper || 'modal-wrapper'"
      :style="{ zIndex }"
      @click="handleBackdropClick"
    >
      <!-- Backdrop -->
      <component
        :is="theme?.components?.backdrop || 'div'"
        :class="theme?.classes?.backdrop || 'modal-backdrop'"
        :style="{ opacity: isVisible ? 1 : 0 }"
      />

      <!-- Modal Container -->
      <component
        :is="theme?.components?.modal || 'div'"
        :class="theme?.classes?.modal || 'modal-container'"
        :style="{
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          opacity: isVisible ? 1 : 0,
          maxWidth,
        }"
      >
        <!-- Header -->
        <component
          :is="theme?.components?.header || 'div'"
          :class="theme?.classes?.header || 'modal-header'"
        >
          <component
            :is="theme?.components?.title || 'h2'"
            :class="theme?.classes?.title || 'modal-title'"
          >
            <slot name="title">{{ title }}</slot>
          </component>

          <component
            :is="theme?.components?.closeButton || 'button'"
            v-if="showCloseButton && closeable"
            :class="theme?.classes?.closeButton || 'modal-close-btn'"
            @click="closeModal"
          >
            <slot name="close-icon">×</slot>
          </component>
        </component>

        <!-- Body -->
        <component
          :is="theme?.components?.body || 'div'"
          :class="theme?.classes?.body || 'modal-body'"
        >
          <slot name="default" />
        </component>

        <!-- Footer -->
        <component
          :is="theme?.components?.footer || 'div'"
          v-if="$slots.footer"
          :class="theme?.classes?.footer || 'modal-footer'"
        >
          <slot name="footer" />
        </component>
      </component>
    </component>
  </teleport>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  color: #6b7280;
  transition: color 0.2s ease;
}

.modal-close-btn:hover {
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

/* Animation classes */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
</style>
