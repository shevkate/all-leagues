<script setup lang="ts">
import { onMounted } from 'vue'
import { useLeaguesStore } from '@/stores/leagues'
import SearchBar from '@/components/SearchBar.vue'
import SportFilter from '@/components/SportFilter.vue'
import LeagueList from '@/components/LeagueList.vue'

const store = useLeaguesStore()

onMounted(() => {
  store.loadLeagues()
})
</script>

<template>
  <div class="app">
    <header class="app__header">
      <div class="app__header-content">
        <div class="app__title-group">
          <h1 class="app__title">All Leagues</h1>
          <p class="app__subtitle">Sports leagues from around the world</p>
        </div>

        <div v-if="!store.isLoading" class="app__count">
          {{ store.filteredLeagues.length }} leagues
        </div>
      </div>
    </header>

    <main class="app__main">
      <div class="app__filters">
        <SearchBar v-model="store.searchQuery" />
        <SportFilter
          v-model="store.selectedSport"
          :options="store.sportOptions"
        />
      </div>

      <LeagueList />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__header {
  padding: 40px 24px 32px;
  border-bottom: 1px solid var(--color-border);
}

.app__header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.app__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.app__subtitle {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
}

.app__count {
  font-size: 13px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.app__main {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
}

.app__filters {
  display: flex;
  gap: 12px;
  align-items: center;
}

@media (max-width: 480px) {
  .app__filters {
    flex-direction: column;
  }

  .app__header-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
