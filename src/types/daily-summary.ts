/**
 * Type definitions for Garmin daily summary (wellness) data
 */

/**
 * Daily summary/wellness data from Garmin
 */
export interface DailySummary {
  /** Date in YYYY-MM-DD format */
  date: string;
  /** User profile ID */
  userProfileId: number;
  /** Unique identifier for this summary */
  uuid?: string;
  /** Total steps for the day */
  totalSteps?: number;
  /** Daily step goal */
  dailyStepGoal?: number;
  /** Total distance in meters */
  totalDistanceMeters?: number;
  /** Total calories burned */
  totalCalories?: number;
  /** Active calories (excluding BMR) */
  activeCalories?: number;
  /** Basal metabolic rate calories */
  bmrCalories?: number;
  /** Wellness calories */
  wellnessCalories?: number;
  /** Highly active seconds */
  highlyActiveSeconds?: number;
  /** Active seconds */
  activeSeconds?: number;
  /** Sedentary seconds */
  sedentarySeconds?: number;
  /** Sleeping seconds */
  sleepingSeconds?: number;
  /** Moderate intensity minutes */
  moderateIntensityMinutes?: number;
  /** Vigorous intensity minutes */
  vigorousIntensityMinutes?: number;
  /** Intensity minutes goal */
  intensityMinutesGoal?: number;
  /** Floors ascended */
  floorsAscended?: number;
  /** Floors descended */
  floorsDescended?: number;
  /** Floors ascended goal */
  floorsAscendedGoal?: number;
  /** Minimum heart rate for the day */
  minHeartRate?: number;
  /** Maximum heart rate for the day */
  maxHeartRate?: number;
  /** Resting heart rate */
  restingHeartRate?: number;
  /** Stress data (detailed breakdown) */
  stressData?: Record<string, unknown>;
  /** Body battery data (detailed breakdown) */
  bodyBatteryData?: Record<string, unknown>;
  /** Hydration in ml */
  hydrationMl?: number;
  /** Hydration goal in ml */
  hydrationGoalMl?: number;
  /** Raw data from Garmin export */
  raw: Record<string, unknown>;
}
