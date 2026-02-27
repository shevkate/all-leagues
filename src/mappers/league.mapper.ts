import type { LeagueDTO, SeasonDTO, League, SeasonBadge } from '@/types'

export const toLeague = (dto: LeagueDTO): League => ({
  id: dto.idLeague,
  name: dto.strLeague,
  sport: dto.strSport,
  alternateName: dto.strLeagueAlternate ?? '—',
})

// Append '/small' to get 250px preview instead of the original 720px image.
// See: https://www.thesportsdb.com/documentation (Images section)
export const toSeasonBadge = (dto: SeasonDTO): SeasonBadge => ({
  season: dto.strSeason,
  badgeUrl: dto.strBadge ? `${dto.strBadge}/small` : '',
})
