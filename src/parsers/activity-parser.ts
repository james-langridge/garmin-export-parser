/**
 * Activity parser - converts raw Garmin activity data to typed Activity objects
 */

import { GarminActivity, Activity, ActivitiesExport } from '../types/activity';

/**
 * Transform raw Garmin activity to parsed Activity format
 * This is a pure calculation function with no side effects
 */
function transformActivity(raw: GarminActivity): Activity {
  const activity: Activity = {
    activityId: raw.activityId,
    userProfileId: raw.userProfileId,
    name: raw.name,
    activityType: raw.activityType,
    sportType: raw.sportType,
    eventTypeId: raw.eventTypeId,
    startTimeGmt: new Date(raw.startTimeGmt),
    startTimeLocal: raw.startTimeLocal
      ? new Date(raw.startTimeLocal)
      : undefined,
    duration: raw.duration,
    elapsedDuration: raw.elapsedDuration,
    movingDuration: raw.movingDuration,
    distance: raw.distance,
    elevationGain: raw.elevationGain,
    elevationLoss: raw.elevationLoss,
    minElevation: raw.minElevation,
    maxElevation: raw.maxElevation,
    avgHeartRate: raw.avgHr,
    maxHeartRate: raw.maxHr,
    minHeartRate: raw.minHr,
    avgPower: raw.avgPower,
    maxPower: raw.maxPower,
    normalizedPower: raw.normPower,
    avgSpeed: raw.avgSpeed,
    maxSpeed: raw.maxSpeed,
    avgCadence: raw.avgRunCadence || raw.avgDoubleCadence,
    maxCadence: raw.maxRunCadence || raw.maxDoubleCadence,
    avgStrideLength: raw.avgStrideLength,
    calories: raw.calories,
    bmrCalories: raw.bmrCalories,
    trainingLoad: raw.activityTrainingLoad,
    aerobicTrainingEffect: raw.aerobicTrainingEffect,
    anaerobicTrainingEffect: raw.anaerobicTrainingEffect,
    trainingEffectLabel: raw.trainingEffectLabel,
    vo2MaxValue: raw.vO2MaxValue,
    locationName: raw.locationName,
    deviceId: raw.deviceId,
    manufacturer: raw.manufacturer,
    isFavorite: raw.favorite || false,
    isPr: raw.pr || false,
    isManual: raw.parent || false,
    steps: raw.steps,
    lapCount: raw.lapCount,
    waterEstimated: raw.waterEstimated,
    bodyBatteryChange: raw.differenceBodyBattery,
    raw: raw,
  };

  // Add start location if coordinates are available
  if (raw.startLatitude !== undefined && raw.startLongitude !== undefined) {
    activity.startLocation = {
      latitude: raw.startLatitude,
      longitude: raw.startLongitude,
    };
  }

  // Add end location if coordinates are available
  if (raw.endLatitude !== undefined && raw.endLongitude !== undefined) {
    activity.endLocation = {
      latitude: raw.endLatitude,
      longitude: raw.endLongitude,
    };
  }

  // Add heart rate zones
  if (
    raw.hrTimeInZone_0 !== undefined ||
    raw.hrTimeInZone_1 !== undefined ||
    raw.hrTimeInZone_2 !== undefined ||
    raw.hrTimeInZone_3 !== undefined ||
    raw.hrTimeInZone_4 !== undefined ||
    raw.hrTimeInZone_5 !== undefined ||
    raw.hrTimeInZone_6 !== undefined
  ) {
    activity.heartRateZones = {
      zone0: raw.hrTimeInZone_0,
      zone1: raw.hrTimeInZone_1,
      zone2: raw.hrTimeInZone_2,
      zone3: raw.hrTimeInZone_3,
      zone4: raw.hrTimeInZone_4,
      zone5: raw.hrTimeInZone_5,
      zone6: raw.hrTimeInZone_6,
    };
  }

  // Add respiration data
  if (
    raw.minRespirationRate !== undefined ||
    raw.maxRespirationRate !== undefined ||
    raw.avgRespirationRate !== undefined
  ) {
    activity.respiration = {
      min: raw.minRespirationRate,
      max: raw.maxRespirationRate,
      avg: raw.avgRespirationRate,
    };
  }

  // Add running dynamics
  if (
    raw.avgVerticalOscillation !== undefined ||
    raw.avgGroundContactTime !== undefined ||
    raw.avgVerticalRatio !== undefined
  ) {
    activity.runningDynamics = {
      avgVerticalOscillation: raw.avgVerticalOscillation,
      avgGroundContactTime: raw.avgGroundContactTime,
      avgVerticalRatio: raw.avgVerticalRatio,
    };
  }

  // Add intensity minutes
  if (
    raw.moderateIntensityMinutes !== undefined ||
    raw.vigorousIntensityMinutes !== undefined
  ) {
    activity.intensityMinutes = {
      moderate: raw.moderateIntensityMinutes,
      vigorous: raw.vigorousIntensityMinutes,
    };
  }

  return activity;
}

/**
 * Parse activities from JSON content
 * @param jsonContent - Raw JSON string from Garmin activities export file
 * @returns Array of parsed Activity objects
 */
export function parseActivitiesJson(jsonContent: string): Activity[] {
  const data = JSON.parse(jsonContent) as ActivitiesExport[];

  if (!data || data.length === 0) {
    return [];
  }

  const exportData = data[0];
  if (!exportData.summarizedActivitiesExport) {
    return [];
  }

  return exportData.summarizedActivitiesExport.map(transformActivity);
}
