import { createApiService } from '@/api/CommonApiService'
import { toLeague, toSeasonBadge } from '@/mappers/league.mapper'
import type { LeaguesResponseDTO, SeasonsResponseDTO } from '@/types'
import type { League, SeasonBadge } from '@/types'
import { API_BASE_URL } from '@/api/config'

const api = createApiService(API_BASE_URL)

export const fetchAllLeagues = async (): Promise<League[]> => {
  const data = await api.get<LeaguesResponseDTO>('/all_leagues.php')
  return data.leagues.map(toLeague)
}

export const fetchSeasonBadge = async (leagueId: string): Promise<SeasonBadge | null> => {
  const data = await api.get<SeasonsResponseDTO>(
    `/search_all_seasons.php?badge=1&id=${leagueId}`,
  )

  if (!data.seasons || data.seasons.length === 0) {
    return null
  }

  // The assignment allows any season — we pick the first one that has a badge image,
  // since not all seasons are guaranteed to have strBadge populated.
  // Note: the free API key returns up to 5 seasons per league.
  const firstWithBadge = data.seasons.find((s) => s.strBadge)
  return firstWithBadge ? toSeasonBadge(firstWithBadge) : null
}
