// Common types shared across all data types

/**
 * Represents a time duration in various formats
 */
export interface Duration {
  /** Duration in milliseconds */
  milliseconds?: number;
  /** Duration in seconds */
  seconds?: number;
  /** Formatted duration string (e.g., "1h 30m 45s") */
  formatted?: string;
}

/**
 * Geographic coordinate
 */
export interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * Heart rate zone time distribution
 */
export interface HeartRateZones {
  zone0?: number; // milliseconds
  zone1?: number;
  zone2?: number;
  zone3?: number;
  zone4?: number;
  zone5?: number;
  zone6?: number;
}
