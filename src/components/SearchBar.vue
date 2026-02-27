<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '@/utils/debounce'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Local ref tracks the raw input value immediately for UI purposes (clear button visibility).
// The debounced emit updates the store separately to avoid filtering on every keystroke.
const localValue = ref(props.modelValue)

const emitUpdate = debounce((value: string) => {
  emit('update:modelValue', value)
}, 300)

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  localValue.value = value
  emitUpdate(value)
}

const onClear = () => {
  localValue.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="search-bar">
    <span class="search-bar__icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </span>

    <input
      class="search-bar__input"
      type="text"
      placeholder="Search leagues..."
      :value="modelValue"
      @input="onInput"
    />

    <button
      v-if="localValue"
      class="search-bar__clear"
      aria-label="Clear search"
      @click="onClear"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-bar__icon {
  position: absolute;
  left: 14px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
}

.search-bar__input {
  width: 100%;
  padding: 12px 40px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text);
  font-size: 14px;
  transition: border-color 0.2s;
  outline: none;
}

.search-bar__input::placeholder {
  color: var(--color-text-muted);
}

.search-bar__input:focus {
  border-color: var(--color-accent);
}

.search-bar__clear {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.search-bar__clear:hover {
  color: var(--color-text);
}
</style>
