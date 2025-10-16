/**
 * Generic JSON parser for various Garmin data types
 * Pure calculation functions with no side effects
 */

/**
 * Parse generic JSON content with flexible structure handling
 * Handles different array structures commonly found in Garmin exports
 */
export function parseGenericJson<T>(jsonContent: string): T[] {
  const data = JSON.parse(jsonContent);

  // Handle direct array
  if (Array.isArray(data)) {
    return data as T[];
  }

  // Check for common wrapper properties
  if (data.values && Array.isArray(data.values)) {
    return data.values as T[];
  }

  if (data.data && Array.isArray(data.data)) {
    return data.data as T[];
  }

  // Single object - wrap in array
  return [data] as T[];
}
