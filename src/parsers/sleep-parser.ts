/**
 * Sleep session parser - converts raw Garmin sleep data
 */

import { SleepSession } from '../types/sleep';
import { parseGenericJson } from './generic-parser';

/**
 * Parse sleep sessions from JSON content
 * @param jsonContent - Raw JSON string from Garmin sleep data file
 * @returns Array of SleepSession objects
 */
export function parseSleepSessionsJson(jsonContent: string): SleepSession[] {
  const rawSessions = parseGenericJson<Record<string, unknown>>(jsonContent);

  return rawSessions.map((raw) => ({
    calendarDate: raw.calendarDate as string,
    userProfileId: raw.userProfileId as number,
    sleepStartGmt: raw.sleepStartGmt
      ? new Date(raw.sleepStartGmt as string)
      : undefined,
    sleepEndGmt: raw.sleepEndGmt
      ? new Date(raw.sleepEndGmt as string)
      : undefined,
    deepSleepSeconds: raw.deepSleepSeconds as number | undefined,
    lightSleepSeconds: raw.lightSleepSeconds as number | undefined,
    remSleepSeconds: raw.remSleepSeconds as number | undefined,
    awakeSeconds: raw.awakeSeconds as number | undefined,
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
    avgRespiration: raw.avgRespiration as number | undefined,
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
