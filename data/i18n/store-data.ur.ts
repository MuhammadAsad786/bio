import type { StoreDetails } from '@/data/store-data';

// Urdu overlay for the AUTO-GENERATED scraped store copy (data/store-data.ts), keyed by app slug.
// Lives in this SEPARATE file so re-running scripts/fetch-store-data.mjs never clobbers translations.
// Only `description` / `genres` are worth translating; missing slugs keep the English store text
// (graceful fallback via the merge in data/apps.ts). The long scraped descriptions are the bulkiest
// content — populate progressively. App `name`/`summary`/`category` are handled in apps.ur.ts.
export const storeDataUr: Record<string, Partial<StoreDetails>> = {};
