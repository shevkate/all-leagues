import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllLeagues, fetchSeasonBadge } from '@/api/leagues.api'
import { handleError } from '@/errors/AppError'
import type { League, SeasonBadge } from '@/types'

export const useLeaguesStore = defineStore('leagues', () => {
  // --- State ---
  const leagues = ref<League[]>([])
  // searchQuery and selectedSport are intentionally exposed as writable refs.
  // Pinia explicitly supports direct state mutation — no actions needed when
  // there is no side-effect logic to encapsulate.
  const searchQuery = ref('')
  const selectedSport = ref('')
  const badgeCache = ref(new Map<string, SeasonBadge | null>())
  const loadingBadges = ref(new Set<string>())
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // --- Getters ---
  // Filtering is done client-side since the all_leagues endpoint does not support
  // search or pagination parameters. For large datasets (10k+ leagues), this approach
  // should be replaced with server-side filtering and pagination.
  const filteredLeagues = computed(() => {
    return leagues.value.filter((league) => {
      const matchesSearch =
        league.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        league.alternateName.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesSport = selectedSport.value
        ? league.sport === selectedSport.value
        : true

      return matchesSearch && matchesSport
    })
  })

  // Sport options are derived dynamically from the API response.
  // The free API key (/v1/json/3/) returns only 10 leagues with limited sport variety.
  // With a paid key, this list would reflect the full range of available sports.
  const sportOptions = computed(() => {
    const sports = leagues.value.map((league) => league.sport)
    return [...new Set(sports)].sort()
  })

  // --- Actions ---
  const loadLeagues = async (): Promise<void> => {
    if (leagues.value.length > 0) return

    isLoading.value = true
    error.value = null

    try {
      leagues.value = await fetchAllLeagues()
    } catch (err) {
      error.value = handleError(err).message
    } finally {
      isLoading.value = false
    }
  }

  const loadBadge = async (leagueId: string): Promise<void> => {
    if (badgeCache.value.has(leagueId)) return
    if (loadingBadges.value.has(leagueId)) return

    loadingBadges.value.add(leagueId)

    try {
      const badge = await fetchSeasonBadge(leagueId)
      badgeCache.value.set(leagueId, badge)
    } catch (err) {
      badgeCache.value.set(leagueId, null)
      console.error(handleError(err).message)
    } finally {
      loadingBadges.value.delete(leagueId)
    }
  }

  const isBadgeLoading = (leagueId: string): boolean =>
    loadingBadges.value.has(leagueId)

  const getBadge = (leagueId: string): SeasonBadge | null =>
    badgeCache.value.get(leagueId) ?? null

  const hasBadgeFetched = (leagueId: string): boolean =>
    badgeCache.value.has(leagueId)

  return {
    // State
    leagues,
    searchQuery,
    selectedSport,
    isLoading,
    error,
    // Getters
    filteredLeagues,
    sportOptions,
    // Actions
    loadLeagues,
    loadBadge,
    // Helpers
    isBadgeLoading,
    getBadge,
    hasBadgeFetched,
  }
})
