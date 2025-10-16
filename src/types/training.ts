/**
 * Type definitions for Garmin training metrics
 */

/**
 * Type of training metric
 */
export type TrainingMetricType = 'readiness' | 'load' | 'endurance' | 'hill';

/**
 * Training metric data from Garmin
 */
export interface TrainingMetric {
  /** Date in YYYY-MM-DD format */
  date: string;
  /** User profile ID */
  userProfileId: number;
  /** Type of training metric */
  metricType: TrainingMetricType;
  /** Metric score/value */
  score?: number;
  /** Metric level (e.g., 'optimal', 'productive', 'maintaining') */
  level?: string;
  /** Short feedback message */
  feedbackShort?: string;
  /** Detailed feedback message */
  feedbackLong?: string;
  /** Additional metric-specific data */
  metricData?: Record<string, unknown>;
  /** Raw data from Garmin export */
  raw: Record<string, unknown>;
}
