// --- DTO types (exactly as they come from the API) ---

export interface LeagueDTO {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string | null
}

export interface LeaguesResponseDTO {
  leagues: LeagueDTO[]
}

export interface SeasonDTO {
  strSeason: string
  strBadge: string | null
}

export interface SeasonsResponseDTO {
  seasons: SeasonDTO[] | null
}

// --- Domain types (what we use inside the app) ---

export interface League {
  id: string
  name: string
  sport: string
  alternateName: string
}

export interface SeasonBadge {
  season: string
  badgeUrl: string
}
