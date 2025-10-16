/**
 * garmin-export-parser - Main library entry point
 *
 * A comprehensive TypeScript library for parsing Garmin Connect export files
 */

import {
  extractAndReadFiles,
  findFiles,
  cleanupTempDir,
  readFileContent,
} from './extractors/zip-extractor';
import { parseActivitiesJson } from './parsers/activity-parser';
import { parseDailySummariesJson } from './parsers/daily-summary-parser';
import { parseSleepSessionsJson } from './parsers/sleep-parser';
import { parseTrainingMetricsJson } from './parsers/training-parser';

// Export all types
export * from './types';

// Export parsers for advanced use
export {
  parseActivitiesJson,
  parseDailySummariesJson,
  parseSleepSessionsJson,
  parseTrainingMetricsJson,
  parseGenericJson,
} from './parsers';

// Export extractors for advanced use
export {
  extractZipFile,
  extractAndReadFiles,
  findFiles,
  listFiles,
  readFileContent,
  cleanupTempDir,
  fileExists,
} from './extractors';

import type {
  GarminExportData,
  ParseOptions,
  Activity,
  DailySummary,
  SleepSession,
  TrainingMetric,
} from './types';

/**
 * File patterns for finding Garmin data files
 */
const FILE_PATTERNS = {
  activities: '**/summarizedActivities.json',
  dailySummaries: '**/DI_CONNECT/DI-Connect-Wellness/**/*.json',
  sleepSessions: '**/DI_CONNECT/DI-Connect-Wellness-Sleep/**/*.json',
  trainingMetrics: '**/DI_CONNECT/DI-Connect-Training/**/*.json',
};

/**
 * Parse a Garmin Connect export ZIP file
 *
 * @param zipFilePath - Path to the Garmin export ZIP file
 * @param options - Optional parsing configuration
 * @returns Parsed Garmin data
 *
 * @example
 * ```typescript
 * import { parseGarminExport } from 'garmin-export-parser';
 *
 * const data = await parseGarminExport('./my-export.zip');
 * console.log(`Found ${data.activities.length} activities`);
 * ```
 */
export async function parseGarminExport(
  zipFilePath: string,
  options: ParseOptions = {}
): Promise<GarminExportData> {
  const {
    includeActivities = true,
    includeDailySummaries = true,
    includeSleepSessions = true,
    includeTrainingMetrics = true,
    tempDir,
    keepExtracted = false,
  } = options;

  let extractedTempDir: string | undefined;

  try {
    // Extract ZIP file
    const extraction = extractAndReadFiles(zipFilePath, tempDir);
    extractedTempDir = extraction.tempDir;

    const activities: Activity[] = [];
    const dailySummaries: DailySummary[] = [];
    const sleepSessions: SleepSession[] = [];
    const trainingMetrics: TrainingMetric[] = [];

    // Parse activities
    if (includeActivities) {
      const activityFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.activities
      );
      for (const filePath of activityFiles) {
        const content = readFileContent(filePath);
        const parsed = parseActivitiesJson(content);
        activities.push(...parsed);
      }
    }

    // Parse daily summaries
    if (includeDailySummaries) {
      const summaryFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.dailySummaries
      );
      for (const filePath of summaryFiles) {
        const content = readFileContent(filePath);
        const parsed = parseDailySummariesJson(content);
        dailySummaries.push(...parsed);
      }
    }

    // Parse sleep sessions
    if (includeSleepSessions) {
      const sleepFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.sleepSessions
      );
      for (const filePath of sleepFiles) {
        const content = readFileContent(filePath);
        const parsed = parseSleepSessionsJson(content);
        sleepSessions.push(...parsed);
      }
    }

    // Parse training metrics
    if (includeTrainingMetrics) {
      const trainingFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.trainingMetrics
      );
      for (const filePath of trainingFiles) {
        const content = readFileContent(filePath);
        const parsed = parseTrainingMetricsJson(content);
        trainingMetrics.push(...parsed);
      }
    }

    return {
      activities,
      dailySummaries,
      sleepSessions,
      trainingMetrics,
      metadata: {
        fileCount: extraction.filePaths.length,
      },
    };
  } finally {
    // Cleanup unless requested to keep
    if (extractedTempDir && !keepExtracted) {
      cleanupTempDir(extractedTempDir);
    }
  }
}

/**
 * Synchronous version of parseGarminExport
 * Useful when working in synchronous contexts
 *
 * @param zipFilePath - Path to the Garmin export ZIP file
 * @param options - Optional parsing configuration
 * @returns Parsed Garmin data
 */
export function parseGarminExportSync(
  zipFilePath: string,
  options: ParseOptions = {}
): GarminExportData {
  const {
    includeActivities = true,
    includeDailySummaries = true,
    includeSleepSessions = true,
    includeTrainingMetrics = true,
    tempDir,
    keepExtracted = false,
  } = options;

  let extractedTempDir: string | undefined;

  try {
    // Extract ZIP file
    const extraction = extractAndReadFiles(zipFilePath, tempDir);
    extractedTempDir = extraction.tempDir;

    const activities: Activity[] = [];
    const dailySummaries: DailySummary[] = [];
    const sleepSessions: SleepSession[] = [];
    const trainingMetrics: TrainingMetric[] = [];

    // Parse activities
    if (includeActivities) {
      const activityFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.activities
      );
      for (const filePath of activityFiles) {
        const content = readFileContent(filePath);
        const parsed = parseActivitiesJson(content);
        activities.push(...parsed);
      }
    }

    // Parse daily summaries
    if (includeDailySummaries) {
      const summaryFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.dailySummaries
      );
      for (const filePath of summaryFiles) {
        const content = readFileContent(filePath);
        const parsed = parseDailySummariesJson(content);
        dailySummaries.push(...parsed);
      }
    }

    // Parse sleep sessions
    if (includeSleepSessions) {
      const sleepFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.sleepSessions
      );
      for (const filePath of sleepFiles) {
        const content = readFileContent(filePath);
        const parsed = parseSleepSessionsJson(content);
        sleepSessions.push(...parsed);
      }
    }

    // Parse training metrics
    if (includeTrainingMetrics) {
      const trainingFiles = findFiles(
        extraction.tempDir,
        FILE_PATTERNS.trainingMetrics
      );
      for (const filePath of trainingFiles) {
        const content = readFileContent(filePath);
        const parsed = parseTrainingMetricsJson(content);
        trainingMetrics.push(...parsed);
      }
    }

    return {
      activities,
      dailySummaries,
      sleepSessions,
      trainingMetrics,
      metadata: {
        fileCount: extraction.filePaths.length,
      },
    };
  } finally {
    // Cleanup unless requested to keep
    if (extractedTempDir && !keepExtracted) {
      cleanupTempDir(extractedTempDir);
    }
  }
}

/**
 * Advanced parser class for progressive/streaming parsing
 */
export class GarminExportParser {
  private options: ParseOptions;

  constructor(options: ParseOptions = {}) {
    this.options = options;
  }

  /**
   * Parse a Garmin export file
   */
  async parse(zipFilePath: string): Promise<GarminExportData> {
    return parseGarminExport(zipFilePath, this.options);
  }

  /**
   * Parse synchronously
   */
  parseSync(zipFilePath: string): GarminExportData {
    return parseGarminExportSync(zipFilePath, this.options);
  }

  /**
   * Parse individual data types from JSON content
   */
  parseActivities(jsonContent: string): Activity[] {
    return parseActivitiesJson(jsonContent);
  }

  parseDailySummaries(jsonContent: string): DailySummary[] {
    return parseDailySummariesJson(jsonContent);
  }

  parseSleepSessions(jsonContent: string): SleepSession[] {
    return parseSleepSessionsJson(jsonContent);
  }

  parseTrainingMetrics(jsonContent: string): TrainingMetric[] {
    return parseTrainingMetricsJson(jsonContent);
  }
}
