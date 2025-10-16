/**
 * ZIP extraction functionality for Node.js
 * Uses adm-zip for synchronous, reliable extraction
 */

import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { calculateTempDir, matchesPatterns } from '../utils/file-utils';

/**
 * Result of ZIP extraction operation
 */
export interface ExtractedFiles {
  /** Temporary directory where files were extracted */
  tempDir: string;
  /** Map of file paths to their contents */
  files: Map<string, string>;
  /** List of all file paths */
  filePaths: string[];
}

/**
 * Extract ZIP file to temporary directory
 * @param zipFilePath - Path to ZIP file
 * @param customTempDir - Optional custom temporary directory
 * @returns Temporary directory path
 */
export function extractZipFile(
  zipFilePath: string,
  customTempDir?: string
): string {
  const tempDir = calculateTempDir(zipFilePath, customTempDir);

  // Create temp directory
  fs.mkdirSync(tempDir, { recursive: true });

  // Extract ZIP
  const zip = new AdmZip(zipFilePath);
  zip.extractAllTo(tempDir, true);

  return tempDir;
}

/**
 * List all files in directory recursively
 * @param dirPath - Directory path to traverse
 * @returns Array of file paths
 */
export function listFiles(dirPath: string): string[] {
  const files: string[] = [];

  function traverse(currentPath: string): void {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  traverse(dirPath);
  return files;
}

/**
 * Find files matching patterns in directory
 * @param basePath - Base directory to search
 * @param patterns - File patterns to match (glob-style)
 * @returns Array of matching file paths
 */
export function findFiles(basePath: string, ...patterns: string[]): string[] {
  const allFiles = listFiles(basePath);
  return allFiles.filter((file) => matchesPatterns(file, patterns));
}

/**
 * Read file content as UTF-8 string
 * @param filePath - Path to file
 * @returns File content as string
 */
export function readFileContent(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Extract ZIP and return file contents
 * @param zipFilePath - Path to ZIP file
 * @param customTempDir - Optional custom temporary directory
 * @returns Extracted files with contents
 */
export function extractAndReadFiles(
  zipFilePath: string,
  customTempDir?: string
): ExtractedFiles {
  const tempDir = extractZipFile(zipFilePath, customTempDir);
  const filePaths = listFiles(tempDir);

  const files = new Map<string, string>();
  for (const filePath of filePaths) {
    files.set(filePath, readFileContent(filePath));
  }

  return {
    tempDir,
    files,
    filePaths,
  };
}

/**
 * Clean up temporary directory
 * @param tempDir - Temporary directory to remove
 */
export function cleanupTempDir(tempDir: string): void {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

/**
 * Check if file exists
 * @param filePath - Path to check
 * @returns True if file exists
 */
export function fileExists(filePath: string): boolean {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}
