/**
 * Training metrics parser - converts raw Garmin training data
 */

import { TrainingMetric, TrainingMetricType } from '../types/training';
import { parseGenericJson } from './generic-parser';

/**
 * Parse training metrics from JSON content
 * @param jsonContent - Raw JSON string from Garmin training metrics file
 * @returns Array of TrainingMetric objects
 */
export function parseTrainingMetricsJson(
  jsonContent: string
): TrainingMetric[] {
  const rawMetrics = parseGenericJson<Record<string, unknown>>(jsonContent);

  return rawMetrics.map((raw) => ({
    date: raw.date as string,
    userProfileId: raw.userProfileId as number,
    metricType: raw.metricType as TrainingMetricType,
    score: raw.score as number | undefined,
    level: raw.level as string | undefined,
    feedbackShort: raw.feedbackShort as string | undefined,
    feedbackLong: raw.feedbackLong as string | undefined,
    metricData: raw.metricData as Record<string, unknown> | undefined,
    raw,
  }));
}
