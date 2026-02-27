<script setup lang="ts">
defineProps<{
  options: string[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="sport-filter">
    <span class="sport-filter__icon">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    </span>

    <select
      class="sport-filter__select"
      aria-label="Filter by sport"
      :value="modelValue"
      @change="onChange"
    >
      <option value="">All Sports</option>
      <option v-for="sport in options" :key="sport" :value="sport">
        {{ sport }}
      </option>
    </select>

    <span class="sport-filter__arrow">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  </div>
</template>

<style scoped>
.sport-filter {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 180px;
}

.sport-filter__icon {
  position: absolute;
  left: 14px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.sport-filter__select {
  width: 100%;
  padding: 12px 40px 12px 38px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text);
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  outline: none;
  transition: border-color 0.2s;
}

.sport-filter__select:focus {
  border-color: var(--color-accent);
}

.sport-filter__arrow {
  position: absolute;
  right: 14px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}
</style>
