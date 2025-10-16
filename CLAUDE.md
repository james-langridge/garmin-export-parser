# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`garmin-export-parser` is a TypeScript library for parsing Garmin Connect export ZIP files. It extracts and transforms activities, daily summaries, sleep sessions, and training metrics into typed JavaScript objects.

**Core Design Philosophy:**

- Pure functional parsing logic (calculations)
- Side effects isolated to extractors (actions)
- Zero dependencies for core parsing
- Immutable data transformations

## Commands

### Build

```bash
npm run build              # Clean build with TypeScript compilation
npm run typecheck          # Type-check without emitting files
```

### Testing

```bash
npm test                   # Run all tests
npm run test:watch         # Run tests in watch mode
```

### Linting and Formatting

```bash
npm run lint               # Check code style
npm run lint:fix           # Auto-fix linting issues
npm run format             # Format code with Prettier
```

### Development Workflow

```bash
# Standard development cycle:
npm run typecheck          # Verify types
npm run lint               # Check style
npm test                   # Run tests
npm run build              # Build distribution

# For quick iteration:
npm run test:watch         # Auto-run tests on changes
```

## Architecture

### Three-Layer Design

1. **Data Layer** (`src/types/`)
   - Immutable type definitions
   - Raw Garmin formats (`GarminActivity`, etc.)
   - Normalized output formats (`Activity`, `DailySummary`, etc.)
   - No behavior, pure structure

2. **Calculation Layer** (`src/parsers/`)
   - Pure transformation functions
   - Convert raw Garmin data → normalized types
   - Zero side effects, testable without mocks
   - Files: `activity-parser.ts`, `daily-summary-parser.ts`, `sleep-parser.ts`, `training-parser.ts`

3. **Action Layer** (`src/extractors/`)
   - I/O operations: ZIP extraction, file reading
   - Filesystem interactions
   - Thin shell around calculations
   - File: `zip-extractor.ts`

### Main Entry Point (`src/index.ts`)

Orchestrates the full parsing flow:

1. Extract ZIP (action)
2. Find relevant JSON files (action)
3. Parse each file (calculation)
4. Aggregate results (calculation)
5. Cleanup temp files (action)

Provides three interfaces:

- `parseGarminExport()` - Async function (recommended)
- `parseGarminExportSync()` - Sync version
- `GarminExportParser` - Class-based API for advanced usage

### File Patterns

The library searches for these specific files in Garmin exports:

- Activities: `**/summarizedActivities.json`
- Daily Summaries: `**/DI_CONNECT/DI-Connect-Wellness/**/*.json`
- Sleep Sessions: `**/DI_CONNECT/DI-Connect-Wellness-Sleep/**/*.json`
- Training Metrics: `**/DI_CONNECT/DI-Connect-Training/**/*.json`

## Key Design Principles

### 1. Separation of Concerns

- **Parsers are pure functions** - They take JSON strings and return typed objects. No file I/O.
- **Extractors handle I/O** - They manage ZIP files and filesystem operations.
- **Main entry point orchestrates** - Combines extractors and parsers.

### 2. Immutable Transformations

All parser functions follow this pattern:

```typescript
function transformX(raw: GarminX): X {
  const result: X = {
    // Map raw fields to normalized schema
  };

  // Conditionally add optional fields
  if (raw.optionalField) {
    result.optionalField = raw.optionalField;
  }

  return result;
}
```

### 3. Type Safety

- **Dual type system**: Raw Garmin types (`Garmin*`) + normalized types (`Activity`, etc.)
- **Optional fields**: Use `?` for fields that may not be present in all exports
- **Date normalization**: Convert Garmin timestamps (numbers) to JavaScript `Date` objects
- **Export all types**: Users can import any type for their own type safety

### 4. Error Handling

- Invalid JSON throws naturally (caller handles)
- Missing files return empty arrays
- Cleanup happens in `finally` blocks

## Modifying the Library

### Adding a New Field to Activities

1. Add to raw type (`src/types/activity.ts`):

```typescript
export interface GarminActivity {
  // ...existing fields
  newField?: number;
}
```

2. Add to normalized type:

```typescript
export interface Activity {
  // ...existing fields
  /** JSDoc description */
  newField?: number;
}
```

3. Add transformation logic (`src/parsers/activity-parser.ts`):

```typescript
function transformActivity(raw: GarminActivity): Activity {
  const activity: Activity = {
    // ...existing mappings
    newField: raw.newField,
  };
  return activity;
}
```

### Adding a New Parser

1. Create type definitions in `src/types/new-data.ts`
2. Create parser in `src/parsers/new-data-parser.ts`
3. Export from `src/parsers/index.ts`
4. Add file pattern to `FILE_PATTERNS` in `src/index.ts`
5. Integrate into main parsing flow in `parseGarminExport()`

### Testing Strategy

- **Unit test parsers extensively** - They're pure functions, easy to test
- **Test with real Garmin export samples** - Use anonymized data
- Tests should live in `tests/` directory (configured in `jest.config.js`)

## TypeScript Configuration

- **Target**: ES2020 (Node.js 16+ support)
- **Module**: CommonJS (for npm compatibility)
- **Strict mode**: Enabled (all strict checks on)
- **Output**: `dist/` directory with declaration files

Build produces:

- `dist/**/*.js` - Compiled JavaScript
- `dist/**/*.d.ts` - Type declarations
- `dist/**/*.js.map` - Source maps

## Distribution

The package exports:

- Main API functions (`parseGarminExport`, `parseGarminExportSync`, `GarminExportParser`)
- Individual parsers for advanced usage
- All type definitions
- Utility functions (extractors, file utils)

Users can import at any level:

```typescript
// Simple usage
import { parseGarminExport } from 'garmin-export-parser';

// Advanced usage
import { parseActivitiesJson, extractZipFile } from 'garmin-export-parser';

// Types only
import type { Activity, GarminActivity } from 'garmin-export-parser';
```
