/**
 * Training metrics parser - converts raw Garmin training data
 */

import { TrainingMetric, TrainingMetricType } from '../types/training';
import { parseGenericJson } from './generic-parser';

/**
 * Extract metric type from training file name
 * @param fileName - Training metrics filename
 * @returns Metric type or 'readiness' as default
 */
function extractMetricType(fileName: string): TrainingMetricType {
  if (fileName.includes('TrainingReadiness')) return 'readiness';
  if (
    fileName.includes('TrainingLoad') ||
    fileName.includes('MetricsAcuteTrainingLoad')
  )
    return 'load';
  if (fileName.includes('Endurance')) return 'endurance';
  if (fileName.includes('Hill')) return 'hill';
  return 'readiness'; // Default fallback
}

/**
 * Extract user profile ID from training file name
 * Filename format: {Type}_{start}_{end}_{userId}.json
 * @param fileName - Training metrics filename
 * @returns User profile ID or undefined
 */
function extractUserProfileId(fileName: string): number | undefined {
  const match = fileName.match(/(\d+)\.json$/);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Convert date value to YYYY-MM-DD string
 * Handles both string dates and timestamp numbers
 * @param dateValue - Date as string or timestamp
 * @returns Date string in YYYY-MM-DD format
 */
function normalizeDate(dateValue: unknown): string | undefined {
  if (typeof dateValue === 'string') {
    return dateValue;
  }
  if (typeof dateValue === 'number') {
    const date = new Date(dateValue);
    return date.toISOString().split('T')[0];
  }
  return undefined;
}

/**
 * Parse training metrics from JSON content
 * @param jsonContent - Raw JSON string from Garmin training metrics file
 * @param fileName - Optional filename to extract metric type and user profile ID
 * @returns Array of TrainingMetric objects
 */
export function parseTrainingMetricsJson(
  jsonContent: string,
  fileName?: string
): TrainingMetric[] {
  const rawMetrics = parseGenericJson<Record<string, unknown>>(jsonContent);
  const metricType = fileName
    ? extractMetricType(fileName)
    : ('readiness' as TrainingMetricType);
  const userProfileId = fileName ? extractUserProfileId(fileName) : undefined;

  return rawMetrics
    .filter((raw) => raw.calendarDate != null) // Skip invalid records
    .map((raw) => ({
      date: normalizeDate(raw.calendarDate) || normalizeDate(raw.date) || '',
      userProfileId:
        (raw.userProfilePK as number | undefined) ||
        (raw.userProfileId as number | undefined) ||
        userProfileId ||
        0,
      metricType:
        (raw.metricType as TrainingMetricType | undefined) || metricType,
      score: raw.score as number | undefined,
      level: raw.level as string | undefined,
      feedbackShort: raw.feedbackShort as string | undefined,
      feedbackLong: raw.feedbackLong as string | undefined,
      metricData: raw.metricData as Record<string, unknown> | undefined,
      raw,
    }))
    .filter((metric) => metric.date !== ''); // Filter out records with no valid date
}
