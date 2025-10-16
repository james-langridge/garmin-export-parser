/**
 * Sleep session parser - converts raw Garmin sleep data
 */

import { SleepSession } from '../types/sleep';
import { parseGenericJson } from './generic-parser';

/**
 * Extract user profile ID from sleep data filename
 * Filename format: YYYY-MM-DD_YYYY-MM-DD_USERID_sleepData.json
 * @param fileName - Sleep data filename
 * @returns User profile ID or undefined if not found
 */
function extractUserProfileId(fileName: string): number | undefined {
  const match = fileName.match(/(\d+)_sleepData\.json$/);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Parse sleep sessions from JSON content
 * @param jsonContent - Raw JSON string from Garmin sleep data file
 * @param fileName - Optional filename to extract user profile ID from
 * @returns Array of SleepSession objects
 */
export function parseSleepSessionsJson(
  jsonContent: string,
  fileName?: string
): SleepSession[] {
  const rawSessions = parseGenericJson<Record<string, unknown>>(jsonContent);
  const userProfileId = fileName ? extractUserProfileId(fileName) : undefined;

  return rawSessions
    .filter((raw) => raw.calendarDate != null) // Skip invalid records
    .map((raw) => ({
      calendarDate: raw.calendarDate as string,
      userProfileId:
        (raw.userProfilePK as number | undefined) ||
        (raw.userProfileId as number | undefined) ||
        userProfileId ||
        0, // Fallback to 0 if no ID found
      sleepStartGmt: raw.sleepStartTimestampGMT
        ? new Date(raw.sleepStartTimestampGMT as string)
        : undefined,
      sleepEndGmt: raw.sleepEndTimestampGMT
        ? new Date(raw.sleepEndTimestampGMT as string)
        : undefined,
      deepSleepSeconds: raw.deepSleepSeconds as number | undefined,
      lightSleepSeconds: raw.lightSleepSeconds as number | undefined,
      remSleepSeconds: raw.remSleepSeconds as number | undefined,
      awakeSeconds: raw.awakeSleepSeconds as number | undefined,
      unmeasurableSeconds: raw.unmeasurableSeconds as number | undefined,
      scores: raw.sleepScores as
        | {
            overall?: number;
            quality?: number;
            duration?: number;
            recovery?: number;
            deep?: number;
            rem?: number;
            light?: number;
          }
        | undefined,
      avgRespiration: raw.averageRespiration as number | undefined,
      lowestRespiration: raw.lowestRespiration as number | undefined,
      highestRespiration: raw.highestRespiration as number | undefined,
      spo2: raw.spo2Summary as
        | {
            avg?: number;
            lowest?: number;
            highest?: number;
          }
        | undefined,
      avgHeartRate: raw.avgHeartRate as number | undefined,
      awakeCount: raw.awakeCount as number | undefined,
      restlessMomentCount: raw.restlessMomentCount as number | undefined,
      avgSleepStress: raw.avgSleepStress as number | undefined,
      raw,
    }));
}
