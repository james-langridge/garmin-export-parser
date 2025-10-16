/**
 * Type definitions for Garmin sleep tracking data
 */

/**
 * Sleep scores breakdown
 */
export interface SleepScores {
  overall?: number;
  quality?: number;
  duration?: number;
  recovery?: number;
  deep?: number;
  rem?: number;
  light?: number;
}

/**
 * SpO2 (blood oxygen) summary data
 */
export interface SpO2Summary {
  avg?: number;
  lowest?: number;
  highest?: number;
}

/**
 * Sleep session data from Garmin
 */
export interface SleepSession {
  /** Calendar date in YYYY-MM-DD format */
  calendarDate: string;
  /** User profile ID */
  userProfileId: number;
  /** Sleep start time in GMT */
  sleepStartGmt?: Date;
  /** Sleep end time in GMT */
  sleepEndGmt?: Date;
  /** Deep sleep duration in seconds */
  deepSleepSeconds?: number;
  /** Light sleep duration in seconds */
  lightSleepSeconds?: number;
  /** REM sleep duration in seconds */
  remSleepSeconds?: number;
  /** Awake duration in seconds */
  awakeSeconds?: number;
  /** Unmeasurable sleep duration in seconds */
  unmeasurableSeconds?: number;
  /** Sleep scores */
  scores?: SleepScores;
  /** Average respiration rate during sleep */
  avgRespiration?: number;
  /** Lowest respiration rate */
  lowestRespiration?: number;
  /** Highest respiration rate */
  highestRespiration?: number;
  /** SpO2 (blood oxygen) data */
  spo2?: SpO2Summary;
  /** Average heart rate during sleep */
  avgHeartRate?: number;
  /** Number of times awoken */
  awakeCount?: number;
  /** Number of restless moments */
  restlessMomentCount?: number;
  /** Average sleep stress level */
  avgSleepStress?: number;
  /** Raw data from Garmin export */
  raw: Record<string, unknown>;
}
