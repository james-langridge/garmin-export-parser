/**
 * Type definitions for garmin-export-parser
 */

// Common types
export * from './common';

// Activity types
export * from './activity';

// Daily summary types
export * from './daily-summary';

// Sleep types
export * from './sleep';

// Training metrics types
export * from './training';

/**
 * Options for parsing Garmin export files
 */
export interface ParseOptions {
  /** Include activities in the parsed data */
  includeActivities?: boolean;
  /** Include daily summaries in the parsed data */
  includeDailySummaries?: boolean;
  /** Include sleep sessions in the parsed data */
  includeSleepSessions?: boolean;
  /** Include training metrics in the parsed data */
  includeTrainingMetrics?: boolean;
  /** Temporary directory for ZIP extraction */
  tempDir?: string;
  /** Keep extracted files after parsing */
  keepExtracted?: boolean;
}

/**
 * Metadata about the Garmin export
 */
export interface ExportMetadata {
  /** Export date (if available) */
  exportDate?: Date;
  /** User ID (if available) */
  userId?: string;
  /** Total number of files in the export */
  fileCount: number;
}

/**
 * Complete parsed data from a Garmin export
 */
export interface GarminExportData {
  /** Parsed activities */
  activities: import('./activity').Activity[];
  /** Parsed daily summaries */
  dailySummaries: DailySummary[];
  /** Parsed sleep sessions */
  sleepSessions: import('./sleep').SleepSession[];
  /** Parsed training metrics */
  trainingMetrics: import('./training').TrainingMetric[];
  /** Export metadata */
  metadata: ExportMetadata;
}
