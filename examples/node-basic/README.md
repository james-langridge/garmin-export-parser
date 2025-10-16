# Basic Node.js Example

This example demonstrates basic usage of the garmin-export-parser library.

## Prerequisites

1. Build the library:
   ```bash
   cd ../..
   npm run build
   ```

2. Have a Garmin Connect export ZIP file

## Running the Example

```bash
node index.js /path/to/your/garmin-export.zip
```

## What it does

This example:
1. Parses the Garmin export ZIP file
2. Displays counts of all data types found
3. Shows details of the first activity
4. Calculates total distance across all activities

## Next Steps

Check out the other examples for more advanced usage:
- `examples/node-advanced/` - Advanced filtering and analysis
