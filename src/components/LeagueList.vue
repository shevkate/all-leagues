<script setup lang="ts">
import { useLeaguesStore } from '@/stores/leagues'
import LeagueCard from '@/components/LeagueCard.vue'

const store = useLeaguesStore()

// Number of skeleton cards to show while loading.
// Matches the typical grid row count at the default viewport width.
const SKELETON_COUNT = 12
</script>

<template>
  <div class="league-list">
    <!-- Loading state -->
    <div v-if="store.isLoading" class="league-list__skeletons">
      <div
        v-for="n in SKELETON_COUNT"
        :key="n"
        class="league-list__skeleton"
      />
    </div>

    <!-- Error state -->
    <div v-else-if="store.error" class="league-list__error">
      <span class="league-list__error-icon">⚠</span>
      <p>{{ store.error }}</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="store.filteredLeagues.length === 0" class="league-list__empty">
      <span class="league-list__empty-icon">🔍</span>
      <p>No leagues found</p>
      <span>Try adjusting your search or filter</span>
    </div>

    <!-- List -->
    <div v-else class="league-list__grid">
      <LeagueCard
        v-for="league in store.filteredLeagues"
        :key="league.id"
        :league="league"
      />
    </div>
  </div>
</template>

<style scoped>
.league-list__skeletons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.league-list__skeleton {
  height: 100px;
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    var(--color-border) 50%,
    var(--color-surface) 75%
  );
  background-size: 200% 100%;
  border-radius: 12px;
  animation: shimmer 1.4s infinite;
}

.league-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.league-list__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 20px;
  color: var(--color-error);
  text-align: center;
}

.league-list__error-icon {
  font-size: 32px;
}

.league-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 60px 20px;
  color: var(--color-text-muted);
  text-align: center;
}

.league-list__empty-icon {
  font-size: 32px;
  margin-bottom: 4px;
}

.league-list__empty p {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}

.league-list__empty span {
  font-size: 14px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
