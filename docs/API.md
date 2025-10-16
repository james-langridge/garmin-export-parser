# API Reference

## Main Functions

### parseGarminExport(zipFilePath, options?)

Asynchronously parse a Garmin Connect export ZIP file.

**Signature:**
```typescript
async function parseGarminExport(
  zipFilePath: string,
  options?: ParseOptions
): Promise<GarminExportData>
```

**Parameters:**
- `zipFilePath: string` - Path to the Garmin export ZIP file
- `options?: ParseOptions` - Optional parsing configuration

**Returns:** `Promise<GarminExportData>`

**Example:**
```typescript
const data = await parseGarminExport('./export.zip', {
  includeActivities: true,
  includeDailySummaries: true,
  includeSleepSessions: true,
  includeTrainingMetrics: true,
});
```

---

### parseGarminExportSync(zipFilePath, options?)

Synchronously parse a Garmin Connect export ZIP file.

**Signature:**
```typescript
function parseGarminExportSync(
  zipFilePath: string,
  options?: ParseOptions
): GarminExportData
```

**Parameters:**
- `zipFilePath: string` - Path to the Garmin export ZIP file
- `options?: ParseOptions` - Optional parsing configuration

**Returns:** `GarminExportData`

---

## GarminExportParser Class

Advanced parser class for more control over parsing.

### Constructor

```typescript
const parser = new GarminExportParser(options?: ParseOptions)
```

### Methods

#### parse(zipFilePath)
```typescript
async parse(zipFilePath: string): Promise<GarminExportData>
```

#### parseSync(zipFilePath)
```typescript
parseSync(zipFilePath: string): GarminExportData
```

#### parseActivities(jsonContent)
```typescript
parseActivities(jsonContent: string): Activity[]
```

#### parseDailySummaries(jsonContent)
```typescript
parseDailySummaries(jsonContent: string): DailySummary[]
```

#### parseSleepSessions(jsonContent)
```typescript
parseSleepSessions(jsonContent: string): SleepSession[]
```

#### parseTrainingMetrics(jsonContent)
```typescript
parseTrainingMetrics(jsonContent: string): TrainingMetric[]
```

---

## Low-Level Parsers

### parseActivitiesJson(jsonContent)
```typescript
function parseActivitiesJson(jsonContent: string): Activity[]
```

### parseDailySummariesJson(jsonContent)
```typescript
function parseDailySummariesJson(jsonContent: string): DailySummary[]
```

### parseSleepSessionsJson(jsonContent)
```typescript
function parseSleepSessionsJson(jsonContent: string): SleepSession[]
```

### parseTrainingMetricsJson(jsonContent)
```typescript
function parseTrainingMetricsJson(jsonContent: string): TrainingMetric[]
```

---

## Extraction Functions

### extractZipFile(zipFilePath, customTempDir?)
```typescript
function extractZipFile(
  zipFilePath: string,
  customTempDir?: string
): string
```

### extractAndReadFiles(zipFilePath, customTempDir?)
```typescript
function extractAndReadFiles(
  zipFilePath: string,
  customTempDir?: string
): ExtractedFiles
```

### findFiles(basePath, ...patterns)
```typescript
function findFiles(basePath: string, ...patterns: string[]): string[]
```

### cleanupTempDir(tempDir)
```typescript
function cleanupTempDir(tempDir: string): void
```

---

## Type Definitions

### ParseOptions

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

### GarminExportData

```typescript
interface GarminExportData {
  activities: Activity[];
  dailySummaries: DailySummary[];
  sleepSessions: SleepSession[];
  trainingMetrics: TrainingMetric[];
  metadata: ExportMetadata;
}
```

### ExportMetadata

```typescript
interface ExportMetadata {
  exportDate?: Date;
  userId?: string;
  fileCount: number;
}
```

### Activity

See [types.md](./types.md) for detailed Activity type definition.

### DailySummary

See [types.md](./types.md) for detailed DailySummary type definition.

### SleepSession

See [types.md](./types.md) for detailed SleepSession type definition.

### TrainingMetric

See [types.md](./types.md) for detailed TrainingMetric type definition.
