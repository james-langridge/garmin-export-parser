/**
 * Type definitions for Garmin activity data
 */

import { Coordinate, HeartRateZones } from './common';

/**
 * Raw Garmin activity data as exported from Garmin Connect
 */
export interface GarminActivity {
  activityId: number;
  uuidMsb: number;
  uuidLsb: number;
  name: string;
  activityType: string;
  userProfileId: number;
  timeZoneId: number;
  beginTimestamp: number;
  eventTypeId: number;
  rule: string;
  sportType: string;
  startTimeGmt: number;
  startTimeLocal: number;
  duration: number;
  distance: number;
  elevationGain?: number;
  elevationLoss?: number;
  minElevation?: number;
  maxElevation?: number;
  avgSpeed?: number;
  maxSpeed?: number;
  avgHr?: number;
  maxHr?: number;
  minHr?: number;
  avgPower?: number;
  maxPower?: number;
  normPower?: number;
  avgRunCadence?: number;
  maxRunCadence?: number;
  steps?: number;
  calories: number;
  bmrCalories?: number;
  startLongitude?: number;
  startLatitude?: number;
  endLongitude?: number;
  endLatitude?: number;
  aerobicTrainingEffect?: number;
  anaerobicTrainingEffect?: number;
  avgStrideLength?: number;
  avgFractionalCadence?: number;
  maxFractionalCadence?: number;
  elapsedDuration?: number;
  movingDuration?: number;
  deviceId?: number;
  locationName?: string;
  manufacturer?: string;
  lapCount?: number;
  waterEstimated?: number;
  minRespirationRate?: number;
  maxRespirationRate?: number;
  avgRespirationRate?: number;
  trainingEffectLabel?: string;
  activityTrainingLoad?: number;
  aerobicTrainingEffectMessage?: string;
  anaerobicTrainingEffectMessage?: string;
  moderateIntensityMinutes?: number;
  vigorousIntensityMinutes?: number;
  differenceBodyBattery?: number;
  maxLatitude?: number;
  maxLongitude?: number;
  minLatitude?: number;
  minLongitude?: number;
  hrTimeInZone_0?: number;
  hrTimeInZone_1?: number;
  hrTimeInZone_2?: number;
  hrTimeInZone_3?: number;
  hrTimeInZone_4?: number;
  hrTimeInZone_5?: number;
  hrTimeInZone_6?: number;
  vO2MaxValue?: number;
  avgVerticalOscillation?: number;
  avgGroundContactTime?: number;
  avgVerticalRatio?: number;
  avgDoubleCadence?: number;
  maxDoubleCadence?: number;
  decoDive?: boolean;
  purposeful?: boolean;
  autoCalcCalories?: boolean;
  favorite?: boolean;
  pr?: boolean;
  elevationCorrected?: boolean;
  atpActivity?: boolean;
  parent?: boolean;
  splitSummaries?: unknown[];
  splits?: unknown[];
}

/**
 * Parsed and normalized activity data
 */
export interface Activity {
  /** Unique activity identifier */
  activityId: number;
  /** User profile ID */
  userProfileId: number;
  /** Activity name/title */
  name: string;
  /** Activity type (e.g., 'running', 'cycling') */
  activityType: string;
  /** Sport type (more specific than activity type) */
  sportType: string;
  /** Event type identifier */
  eventTypeId?: number;
  /** Activity start time in GMT */
  startTimeGmt: Date;
  /** Activity start time in local timezone */
  startTimeLocal?: Date;
  /** Total duration in milliseconds */
  duration?: number;
  /** Elapsed duration including pauses in milliseconds */
  elapsedDuration?: number;
  /** Moving duration excluding pauses in milliseconds */
  movingDuration?: number;
  /** Distance in meters */
  distance?: number;
  /** Elevation gain in meters */
  elevationGain?: number;
  /** Elevation loss in meters */
  elevationLoss?: number;
  /** Minimum elevation in meters */
  minElevation?: number;
  /** Maximum elevation in meters */
  maxElevation?: number;
  /** Average heart rate in bpm */
  avgHeartRate?: number;
  /** Maximum heart rate in bpm */
  maxHeartRate?: number;
  /** Minimum heart rate in bpm */
  minHeartRate?: number;
  /** Average power in watts */
  avgPower?: number;
  /** Maximum power in watts */
  maxPower?: number;
  /** Normalized power in watts */
  normalizedPower?: number;
  /** Average speed in meters/second */
  avgSpeed?: number;
  /** Maximum speed in meters/second */
  maxSpeed?: number;
  /** Average cadence (steps/min for running, rpm for cycling) */
  avgCadence?: number;
  /** Maximum cadence */
  maxCadence?: number;
  /** Average stride length in meters */
  avgStrideLength?: number;
  /** Total calories burned */
  calories?: number;
  /** Basal metabolic rate calories */
  bmrCalories?: number;
  /** Training load */
  trainingLoad?: number;
  /** Aerobic training effect (0-5 scale) */
  aerobicTrainingEffect?: number;
  /** Anaerobic training effect (0-5 scale) */
  anaerobicTrainingEffect?: number;
  /** Training effect label */
  trainingEffectLabel?: string;
  /** VO2 Max value */
  vo2MaxValue?: number;
  /** Start location coordinates */
  startLocation?: Coordinate;
  /** End location coordinates */
  endLocation?: Coordinate;
  /** Location name/description */
  locationName?: string;
  /** Device ID used for recording */
  deviceId?: number;
  /** Device manufacturer */
  manufacturer?: string;
  /** Whether activity is marked as favorite */
  isFavorite?: boolean;
  /** Whether activity is a personal record */
  isPr?: boolean;
  /** Whether activity was manually created */
  isManual?: boolean;
  /** Heart rate zones time distribution */
  heartRateZones?: HeartRateZones;
  /** Number of steps (for running activities) */
  steps?: number;
  /** Number of laps */
  lapCount?: number;
  /** Estimated water consumption in ml */
  waterEstimated?: number;
  /** Respiration metrics */
  respiration?: {
    min?: number;
    max?: number;
    avg?: number;
  };
  /** Running dynamics */
  runningDynamics?: {
    avgVerticalOscillation?: number;
    avgGroundContactTime?: number;
    avgVerticalRatio?: number;
  };
  /** Intensity minutes */
  intensityMinutes?: {
    moderate?: number;
    vigorous?: number;
  };
  /** Body battery change during activity */
  bodyBatteryChange?: number;
  /** Raw Garmin data for advanced use */
  raw: GarminActivity;
}

/**
 * Activities export file structure from Garmin
 */
export interface ActivitiesExport {
  summarizedActivitiesExport: GarminActivity[];
}
