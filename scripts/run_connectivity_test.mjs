import fs from 'fs';
import path from 'path';

// Load .env variables into process.env before running tests
const envPath = path.resolve(process.cwd(), '.env');
let serviceKey = null;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
      if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
        serviceKey = val;
      }
    }
  }
}

// Dynamically import test suite so it picks up the loaded environment variables
const { runDatabaseConnectivityTest } = await import('../src/lib/dbConnectivityTest.js');

async function main() {
  const results = await runDatabaseConnectivityTest({
    adminServiceKey: serviceKey,
    verbose: true
  });

  console.log('\nFINAL SUMMARY JSON:');
  console.log(JSON.stringify(results.summary, null, 2));

  if (!results.allPassed) {
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
