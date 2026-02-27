# Notes

## AI tools

**Claude (Anthropic)** was used throughout the assignment as a pair-programming assistant:

- Discussing and validating architectural decisions before writing code
- Generating boilerplate (component structure, type definitions, CSS)
- Reviewing code for consistency and edge cases

All product logic, architectural choices, and decisions about tradeoffs were made by me — Claude was used as a tool to move faster, not to think instead of me.

## Design decisions

### Architecture

The project follows a layered architecture: **API → Mapper → Store → Components**.

- **DTO types** represent the raw API response shape. **Domain types** represent what the app actually uses. A **mapper layer** transforms between them. This isolates the rest of the app from API contract changes.
- The API service (`CommonApiService`) is a plain function, not a class — Vue projects rarely need class instances for stateless HTTP utilities.

### Caching

Two levels of caching are in place, as required:

1. **HTTP-level cache** — `CommonApiService` caches the `Promise` itself (not the resolved value). This means parallel requests for the same URL share one in-flight request instead of firing duplicates.
2. **Store-level cache** — fetched season badges are stored in a `Map` inside the Pinia store. A league that has already been expanded will not trigger a second API call.

**Known tradeoff — unbounded cache growth.** Both caches use a plain `Map` that grows indefinitely and is never evicted. For 10 leagues this is not a concern. At scale (thousands of leagues), the right solution would be an LRU cache with a fixed size limit — a `createLruCache(maxSize)` factory function that evicts the least recently used entry when the limit is reached. For the HTTP cache (no Vue reactivity needed) this is a straightforward drop-in replacement. For the store's badge cache, the internal `Map` mutations are invisible to Vue's reactivity system, so it would additionally require `shallowRef` + `triggerRef` to notify components of changes. This tradeoff was left as-is intentionally — adding LRU for 10 entries would be premature optimisation.

### Client-side filtering

The `all_leagues` endpoint does not support search or pagination parameters, so filtering by name and sport type is done client-side on the full response. This is noted in the store with a comment about the scalability tradeoff.

### Season badge

The assignment allows any season. We pick the **first season that has a non-empty badge URL** (rather than blindly taking `seasons[0]`) to avoid displaying a broken image when the first entry has no badge.

Badge images are requested with a `/small` suffix (`strBadge + '/small'`) to fetch the 250 px variant instead of the original 720 px image — appropriate for the 120 px display size and faster to load.

### UI

- Skeleton loading, error state, and empty state are all handled explicitly.
- Search input is debounced (300 ms) to avoid filtering on every keystroke.
- Both filter components (`SearchBar`, `SportFilter`) implement the `v-model` contract (`modelValue` prop + `update:modelValue` emit) for consistency.
- Layout uses CSS Grid with `auto-fill` + `minmax` for responsive columns without media queries.

### Component design

`LeagueList` and `LeagueCard` access the Pinia store directly rather than receiving data through props. This is a deliberate choice: the store is the single source of truth for this app, and introducing a props chain (`App → LeagueList → LeagueCard`) for data that is only needed at the leaf level would add indirection without real benefit at this scale. Pinia explicitly supports direct store access from any component — this is idiomatic Vue, not a shortcut.

### Accessibility

League cards are interactive but rendered as `<div>` elements rather than `<button>`, since semantically they are disclosure widgets (expanding content areas), not actions. To compensate, each card has `role="button"`, `tabindex="0"`, `aria-expanded`, and keyboard handlers for Enter and Space — matching the expected behaviour of a native button without misrepresenting the element's purpose.
