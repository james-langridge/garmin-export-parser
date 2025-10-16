# garmin-export-parser

The comprehensive TypeScript/JavaScript library for parsing Garmin Connect export files.

[![npm version](https://badge.fury.io/js/garmin-export-parser.svg)](https://www.npmjs.com/package/garmin-export-parser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Parse complete Garmin Connect export ZIP files
- Full TypeScript support with comprehensive type definitions
- Zero dependencies for core parsing functionality
- Works in Node.js (v16+)
- Handles all major Garmin data types:
  - Activities (runs, rides, swims, etc.)
  - Daily summaries (wellness data)
  - Sleep sessions
  - Training metrics
- Production-tested parsing logic
- Simple, intuitive API

## Installation

```bash
npm install garmin-export-parser
```

## Quick Start

```typescript
import { parseGarminExport } from 'garmin-export-parser';

// Parse a Garmin export ZIP file
const data = await parseGarminExport('./my-garmin-export.zip');

console.log(`Found ${data.activities.length} activities`);
console.log(`Found ${data.dailySummaries.length} daily summaries`);
console.log(`Found ${data.sleepSessions.length} sleep sessions`);
console.log(`Found ${data.trainingMetrics.length} training metrics`);

// Access parsed data
const firstActivity = data.activities[0];
console.log(`Activity: ${firstActivity.name}`);
console.log(`Type: ${firstActivity.activityType}`);
console.log(`Distance: ${firstActivity.distance}m`);
console.log(`Duration: ${firstActivity.duration}ms`);
```

## How to Get Your Garmin Export

1. Log in to [Garmin Connect](https://connect.garmin.com/)
2. Go to Account Settings → Data Management
3. Click "Export Your Data"
4. Wait for the email with your download link
5. Download the ZIP file
6. Use this library to parse it!

## API Documentation

### Main Functions

#### `parseGarminExport(zipFilePath, options?)`

Parse a Garmin Connect export ZIP file asynchronously.

```typescript
async function parseGarminExport(
  zipFilePath: string,
  options?: ParseOptions
): Promise<GarminExportData>
```

**Parameters:**
- `zipFilePath` - Path to the Garmin export ZIP file
- `options` - Optional parsing configuration

**Returns:** Promise resolving to `GarminExportData`

**Example:**
```typescript
const data = await parseGarminExport('./export.zip', {
  includeActivities: true,
  includeDailySummaries: true,
  includeSleepSessions: true,
  includeTrainingMetrics: true,
  tempDir: './temp',
  keepExtracted: false,
});
```

#### `parseGarminExportSync(zipFilePath, options?)`

Synchronous version of `parseGarminExport`.

```typescript
function parseGarminExportSync(
  zipFilePath: string,
  options?: ParseOptions
): GarminExportData
```

**Example:**
```typescript
const data = parseGarminExportSync('./export.zip');
```

### Advanced Usage

#### `GarminExportParser` Class

For more control over parsing:

```typescript
import { GarminExportParser } from 'garmin-export-parser';

const parser = new GarminExportParser({
  includeActivities: true,
  includeDailySummaries: false,
});

// Parse complete export
const data = await parser.parse('./export.zip');

// Or parse individual JSON files
const activities = parser.parseActivities(jsonContent);
const sleepData = parser.parseSleepSessions(jsonContent);
```

### Types

All types are fully documented with JSDoc comments. Import them as needed:

```typescript
import {
  Activity,
  DailySummary,
  SleepSession,
  TrainingMetric,
  GarminExportData,
  ParseOptions,
} from 'garmin-export-parser';
```

#### `Activity`

Comprehensive activity data including:
- Basic info (name, type, sport type)
- Timing (start time, duration)
- Metrics (distance, speed, heart rate, power, cadence)
- Location data (GPS coordinates)
- Training effects
- Heart rate zones
- Running dynamics
- And much more!

#### `DailySummary`

Daily wellness data including:
- Steps and distance
- Calories (total, active, BMR)
- Activity levels (highly active, active, sedentary, sleeping)
- Intensity minutes
- Floors climbed
- Heart rate metrics
- Stress and body battery data
- Hydration

#### `SleepSession`

Sleep tracking data including:
- Sleep duration by stage (deep, light, REM, awake)
- Sleep scores (overall, quality, duration, recovery)
- Respiration metrics
- SpO2 (blood oxygen) data
- Heart rate during sleep
- Restlessness metrics

#### `TrainingMetric`

Training metrics including:
- Readiness score
- Training load
- Endurance metrics
- Hill climb metrics
- Detailed feedback and recommendations

### Parse Options

```typescript
interface ParseOptions {
  includeActivities?: boolean;        // Default: true
  includeDailySummaries?: boolean;    // Default: true
  includeSleepSessions?: boolean;     // Default: true
  includeTrainingMetrics?: boolean;   // Default: true
  tempDir?: string;                   // Default: '/tmp/garmin-export-parser'
  keepExtracted?: boolean;            // Default: false
}
```

## Examples

### Filter Activities by Type

```typescript
const data = await parseGarminExport('./export.zip');

const runs = data.activities.filter(a => a.activityType === 'running');
const rides = data.activities.filter(a => a.activityType === 'cycling');

console.log(`You have ${runs.length} runs and ${rides.length} rides`);
```

### Find Your Longest Run

```typescript
const data = await parseGarminExport('./export.zip');

const longestRun = data.activities
  .filter(a => a.activityType === 'running')
  .sort((a, b) => (b.distance || 0) - (a.distance || 0))[0];

if (longestRun) {
  console.log(`Longest run: ${longestRun.name}`);
  console.log(`Distance: ${(longestRun.distance! / 1000).toFixed(2)}km`);
  console.log(`Date: ${longestRun.startTimeGmt.toLocaleDateString()}`);
}
```

### Analyze Sleep Patterns

```typescript
const data = await parseGarminExport('./export.zip');

const avgSleepScore = data.sleepSessions
  .filter(s => s.scores?.overall)
  .reduce((sum, s) => sum + s.scores!.overall!, 0) / data.sleepSessions.length;

console.log(`Average sleep score: ${avgSleepScore.toFixed(1)}`);

// Find best sleep
const bestSleep = data.sleepSessions
  .filter(s => s.scores?.overall)
  .sort((a, b) => b.scores!.overall! - a.scores!.overall!)[0];

console.log(`Best sleep score: ${bestSleep.scores!.overall} on ${bestSleep.calendarDate}`);
```

### Calculate Total Distance

```typescript
const data = await parseGarminExport('./export.zip');

const totalDistance = data.activities
  .filter(a => a.distance)
  .reduce((sum, a) => sum + a.distance!, 0);

console.log(`Total distance: ${(totalDistance / 1000).toFixed(2)}km`);
```

### Export to CSV

```typescript
import { parseGarminExport } from 'garmin-export-parser';
import { writeFileSync } from 'fs';

const data = await parseGarminExport('./export.zip');

const csv = [
  'Date,Name,Type,Distance (km),Duration (min),Avg HR',
  ...data.activities.map(a => [
    a.startTimeGmt.toLocaleDateString(),
    a.name,
    a.activityType,
    a.distance ? (a.distance / 1000).toFixed(2) : '',
    a.duration ? (a.duration / 60000).toFixed(1) : '',
    a.avgHeartRate || '',
  ].join(','))
].join('\n');

writeFileSync('activities.csv', csv);
```

## Advanced Features

### Parse Only Specific Data Types

Save processing time by only parsing what you need:

```typescript
const data = await parseGarminExport('./export.zip', {
  includeActivities: true,
  includeDailySummaries: false,
  includeSleepSessions: false,
  includeTrainingMetrics: false,
});
```

### Keep Extracted Files

Keep the extracted ZIP contents for debugging or manual inspection:

```typescript
const data = await parseGarminExport('./export.zip', {
  tempDir: './extracted',
  keepExtracted: true,
});

// Files remain in ./extracted directory
```

### Low-Level Parsing

Use individual parsers for custom workflows:

```typescript
import {
  parseActivitiesJson,
  parseDailySummariesJson,
  extractZipFile,
  findFiles,
  readFileContent,
} from 'garmin-export-parser';

// Extract ZIP manually
const tempDir = extractZipFile('./export.zip');

// Find specific files
const activityFiles = findFiles(tempDir, '**/summarizedActivities.json');

// Parse specific file
const content = readFileContent(activityFiles[0]);
const activities = parseActivitiesJson(content);
```

## TypeScript

This library is written in TypeScript and includes complete type definitions. All types are exported:

```typescript
import type {
  Activity,
  DailySummary,
  SleepSession,
  TrainingMetric,
  GarminExportData,
  ParseOptions,
  GarminActivity,  // Raw Garmin format
  Coordinate,
  HeartRateZones,
  SleepScores,
} from 'garmin-export-parser';
```

## Requirements

- Node.js 16 or higher
- A Garmin Connect export ZIP file

## Error Handling

The library throws errors for common issues:

```typescript
import { parseGarminExport } from 'garmin-export-parser';

try {
  const data = await parseGarminExport('./export.zip');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('ZIP file not found');
  } else {
    console.error('Parse error:', error.message);
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT - see [LICENSE](LICENSE) file for details

## Support

- GitHub Issues: [Report bugs or request features](https://github.com/yourusername/garmin-export-parser/issues)
- Documentation: [Full API documentation](./docs/API.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Related Projects

- [garmin-data-visualiser](https://github.com/yourusername/garmin-data-visualiser) - Visualize your Garmin data with a web dashboard

## Acknowledgments

This library uses production-tested parsing logic and is designed for reliability and ease of use.
