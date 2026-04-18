/**
 * Global TypeScript types shared across all features.
 * Feature-specific types live in src/features/<feature>/types.ts
 */

/** Standard return type for all Server Actions — never throw, always return. */
export type ActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

/** Supabase user session shorthand */
export type UserId = string;
