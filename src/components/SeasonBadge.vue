<script setup lang="ts">
import { ref } from 'vue'
import type { SeasonBadge } from '@/types'

defineProps<{
  badge: SeasonBadge
}>()

const imageError = ref(false)

const onImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div class="season-badge">
    <div v-if="imageError" class="season-badge__fallback">
      <span>No image available</span>
    </div>

    <img
      v-else
      class="season-badge__image"
      :src="badge.badgeUrl"
      :alt="`Season ${badge.season} badge`"
      @error="onImageError"
    />

    <span class="season-badge__label">Season {{ badge.season }}</span>
  </div>
</template>

<style scoped>
.season-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.season-badge__image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
}

.season-badge__fallback {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  border-radius: 8px;
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
  padding: 8px;
}

.season-badge__label {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 500;
}
</style>
