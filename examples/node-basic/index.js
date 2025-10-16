/**
 * Basic Node.js example for garmin-export-parser
 *
 * Usage: node examples/node-basic/index.js path/to/your/export.zip
 */

const { parseGarminExport } = require('../../dist/index.js');

async function main() {
  const zipPath = process.argv[2];

  if (!zipPath) {
    console.error('Usage: node index.js <path-to-garmin-export.zip>');
    process.exit(1);
  }

  console.log(`Parsing Garmin export: ${zipPath}\n`);

  try {
    const data = await parseGarminExport(zipPath);

    console.log('Parse Results:');
    console.log(`  Activities: ${data.activities.length}`);
    console.log(`  Daily Summaries: ${data.dailySummaries.length}`);
    console.log(`  Sleep Sessions: ${data.sleepSessions.length}`);
    console.log(`  Training Metrics: ${data.trainingMetrics.length}`);
    console.log(`  Total Files: ${data.metadata.fileCount}\n`);

    if (data.activities.length > 0) {
      const firstActivity = data.activities[0];
      console.log('First Activity:');
      console.log(`  Name: ${firstActivity.name}`);
      console.log(`  Type: ${firstActivity.activityType}`);
      console.log(`  Date: ${firstActivity.startTimeGmt.toLocaleDateString()}`);
      if (firstActivity.distance) {
        console.log(`  Distance: ${(firstActivity.distance / 1000).toFixed(2)} km`);
      }
      if (firstActivity.duration) {
        console.log(`  Duration: ${(firstActivity.duration / 60000).toFixed(1)} min`);
      }
      console.log();
    }

    // Calculate totals
    const totalDistance = data.activities
      .filter(a => a.distance)
      .reduce((sum, a) => sum + a.distance, 0);

    const totalActivities = data.activities.length;

    console.log('Summary:');
    console.log(`  Total Activities: ${totalActivities}`);
    console.log(`  Total Distance: ${(totalDistance / 1000).toFixed(2)} km`);

  } catch (error) {
    console.error('Error parsing Garmin export:', error.message);
    process.exit(1);
  }
}

main();
