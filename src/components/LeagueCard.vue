<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLeaguesStore } from '@/stores/leagues'
import SeasonBadge from '@/components/SeasonBadge.vue'
import type { League } from '@/types'

const props = defineProps<{
  league: League
}>()

const store = useLeaguesStore()

const isExpanded = ref(false)

const badge = computed(() => store.getBadge(props.league.id))
const isLoading = computed(() => store.isBadgeLoading(props.league.id))
const hasBadgeData = computed(() => store.hasBadgeFetched(props.league.id))

const onCardClick = () => {
  isExpanded.value = !isExpanded.value

  if (isExpanded.value && !hasBadgeData.value) {
    store.loadBadge(props.league.id)
  }
}
</script>

<template>
  <div
    class="league-card"
    :class="{ 'league-card--expanded': isExpanded }"
    role="button"
    tabindex="0"
    :aria-expanded="isExpanded"
    @click="onCardClick"
    @keydown.enter="onCardClick"
    @keydown.space.prevent="onCardClick"
  >
    <div class="league-card__main">
      <div class="league-card__info">
        <h3 class="league-card__name">{{ league.name }}</h3>
        <span class="league-card__sport">{{ league.sport }}</span>
        <span class="league-card__alternate">{{ league.alternateName }}</span>
      </div>

      <div class="league-card__chevron" :class="{ 'league-card__chevron--open': isExpanded }">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>

    <Transition name="expand">
      <div v-if="isExpanded" class="league-card__badge">
        <div v-if="isLoading" class="league-card__spinner" />

        <SeasonBadge
          v-else-if="badge"
          :badge="badge"
        />

        <span v-else class="league-card__no-badge">
          No badge available
        </span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.league-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
  user-select: none;
}

.league-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.league-card--expanded {
  border-color: var(--color-accent);
}

.league-card__main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.league-card__info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.league-card__name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.league-card__sport {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.league-card__alternate {
  font-size: 12px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.league-card__chevron {
  color: var(--color-text-muted);
  transition: transform 0.3s;
  flex-shrink: 0;
  margin-top: 2px;
}

.league-card__chevron--open {
  transform: rotate(180deg);
}

.league-card__badge {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
}

.league-card__spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.league-card__no-badge {
  font-size: 13px;
  color: var(--color-text-muted);
}

/* Transition */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
