/**
 * File utility functions
 */

import * as path from 'path';

/**
 * Calculate temporary directory path for ZIP extraction
 * Pure calculation function
 */
export function calculateTempDir(
  zipFilePath: string,
  customTempDir?: string
): string {
  const tempBase = customTempDir || '/tmp/garmin-export-parser';
  const fileName = path.basename(zipFilePath, '.zip');
  const timestamp = Date.now();
  return path.join(tempBase, `${fileName}_${timestamp}`);
}

/**
 * Convert file pattern glob to regex
 * Pure calculation function
 */
export function patternToRegex(pattern: string): RegExp {
  const regexPattern = pattern
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*');
  return new RegExp(regexPattern);
}

/**
 * Check if file path matches any of the given patterns
 * Pure calculation function
 */
export function matchesPatterns(
  filePath: string,
  patterns: string[]
): boolean {
  for (const pattern of patterns) {
    const regex = patternToRegex(pattern);
    if (regex.test(filePath)) {
      return true;
    }
  }
  return false;
}
