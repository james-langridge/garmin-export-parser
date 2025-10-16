/**
 * Daily summary parser - converts raw Garmin daily summary data
 */

import { DailySummary } from '../types/daily-summary';
import { parseGenericJson } from './generic-parser';

/**
 * Parse daily summaries from JSON content
 * @param jsonContent - Raw JSON string from Garmin daily summaries file
 * @returns Array of DailySummary objects
 */
export function parseDailySummariesJson(jsonContent: string): DailySummary[] {
  return parseGenericJson<DailySummary>(jsonContent);
}
