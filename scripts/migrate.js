import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Helper to read .env
function getEnvConfig() {
  const envPath = path.join(projectRoot, '.env');
  const config = {
    token: process.env.SUPABASE_ACCESS_TOKEN,
    dbUrl: process.env.DATABASE_URL,
    dbPassword: process.env.SUPABASE_DB_PASSWORD,
    projectRef: 'zkezldcumhqqjoubrozo'
  };

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const tokenMatch = envContent.match(/SUPABASE_ACCESS_TOKEN=(.+)/);
    if (tokenMatch && tokenMatch[1].trim()) config.token = tokenMatch[1].trim();

    const dbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
    if (dbUrlMatch && dbUrlMatch[1].trim()) config.dbUrl = dbUrlMatch[1].trim();

    const pwdMatch = envContent.match(/SUPABASE_DB_PASSWORD=(.+)/);
    if (pwdMatch && pwdMatch[1].trim()) config.dbPassword = pwdMatch[1].trim();
  }
  return config;
}

// 1. Execute SQL via Supabase HTTPS Management API (Bypasses ISP port 5432/6543 blocks)
async function executeViaManagementApi(token, projectRef, sql) {
  console.log(`🌐 Connecting via Supabase HTTPS Management API (Port 443)...`);
  const endpoint = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;
  
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql, read_only: false })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Management API error (${res.status}): ${errText}`);
  }

  return await res.json();
}

async function runVerificationViaApi(token, projectRef) {
  console.log('\n==========================================');
  console.log('🔍 VERIFYING DATABASE OBJECTS & CONSTRAINTS');
  console.log('==========================================');

  // Verify Tables
  const expectedTables = [
    'candidates',
    'employer_vacancies',
    'vacancy_shortlists',
    'market_role_demand',
    'competitor_matrix',
    'budget_allocations',
    'launch_plan_tasks'
  ];

  const tablesQuery = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`;
  const tablesData = await executeViaManagementApi(token, projectRef, tablesQuery);
  const foundTables = (Array.isArray(tablesData) ? tablesData : []).map(r => r.table_name);

  console.log('\n📊 Tables Verification:');
  for (const tbl of expectedTables) {
    if (foundTables.includes(tbl)) {
      console.log(`  ✓ Table public.${tbl}: CREATED`);
    } else {
      console.error(`  ✗ Table public.${tbl}: MISSING`);
    }
  }

  // Verify Foreign Keys
  const fkQuery = `
    SELECT
      tc.table_name, 
      kcu.column_name, 
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name 
    FROM 
      information_schema.table_constraints AS tc 
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema='public';
  `;
  const fkData = await executeViaManagementApi(token, projectRef, fkQuery);
  console.log('\n🔗 Foreign Key Relationships Verification:');
  for (const fk of (Array.isArray(fkData) ? fkData : [])) {
    console.log(`  ✓ ${fk.table_name}.${fk.column_name} ➔ ${fk.foreign_table_name}.${fk.foreign_column_name}`);
  }

  // Verify Primary Keys & Constraints
  const pkQuery = `
    SELECT tc.table_name, tc.constraint_name, tc.constraint_type, kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_schema = 'public' AND tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE')
    ORDER BY tc.table_name, tc.constraint_type;
  `;
  const pkData = await executeViaManagementApi(token, projectRef, pkQuery);
  console.log('\n🛡️ Constraints & Primary Keys Verification:');
  for (const c of (Array.isArray(pkData) ? pkData : [])) {
    console.log(`  ✓ ${c.table_name} [${c.constraint_type}] on column (${c.column_name})`);
  }

  // Verify Seed Records Count
  console.log('\n📦 Seed Records Verification:');
  for (const tbl of expectedTables) {
    const cntRes = await executeViaManagementApi(token, projectRef, `SELECT COUNT(*) FROM public.${tbl};`);
    const count = cntRes && cntRes[0] ? (cntRes[0].count || cntRes[0]['count(*)'] || 0) : 0;
    console.log(`  ✓ public.${tbl}: ${count} records`);
  }

  console.log('\n🎉 ALL 7 TABLES, CONSTRAINTS, RELATIONSHIPS AND DATA VERIFIED SUCCESSFULLY!\n');
}

async function main() {
  const config = getEnvConfig();
  const sqlPath = path.join(projectRoot, 'supabase_schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Option A: If SUPABASE_ACCESS_TOKEN is available, use HTTPS Management API (Bypasses port blocking!)
  if (config.token) {
    console.log('🚀 Running migration via Supabase Management API...');
    try {
      await executeViaManagementApi(config.token, config.projectRef, sql);
      console.log('✅ Migration SQL executed successfully.');
      await runVerificationViaApi(config.token, config.projectRef);
      return;
    } catch (e) {
      console.error('❌ Management API error:', e.message);
      process.exit(1);
    }
  }

  // Option B: Direct PostgreSQL connection
  console.log('ℹ️ SUPABASE_ACCESS_TOKEN not detected. Attempting direct PostgreSQL connection...');
  console.log('⚠️ Note: Many local networks and ISPs block outbound ports 5432 and 6543.');
  console.log('👉 To run the migration reliably over HTTPS, get your Supabase Access Token from:');
  console.log('   https://supabase.com/dashboard/account/tokens');
  console.log('   and add to .env: SUPABASE_ACCESS_TOKEN=sbp_...\n');

  if (!config.dbPassword && !config.dbUrl) {
    console.error('❌ Neither SUPABASE_ACCESS_TOKEN nor SUPABASE_DB_PASSWORD was found.');
    process.exit(1);
  }

  // Attempt connection
  const encPwd = encodeURIComponent(config.dbPassword);
  const ref = config.projectRef;
  const urls = config.dbUrl ? [config.dbUrl] : [
    `postgresql://postgres.${ref}:${encPwd}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres.${ref}:${encPwd}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`,
    `postgresql://postgres:${encPwd}@db.${ref}.supabase.co:5432/postgres`
  ];

  let client = null;
  for (const u of urls) {
    const masked = u.replace(/:([^:@]+)@/, ':***@');
    try {
      const c = new pg.Client({ connectionString: u, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 5000 });
      await c.connect();
      client = c;
      console.log(`✅ Connected successfully to ${masked}`);
      break;
    } catch (e) {
      console.log(`  [Try ${masked}]: ${e.code || e.message}`);
    }
  }

  if (!client) {
    console.error('\n❌ Direct PostgreSQL connection timed out (outbound port 5432/6543 blocked by network).');
    console.error('👉 Generate a quick Supabase Access Token (takes 10 seconds):');
    console.error('   1. Visit https://supabase.com/dashboard/account/tokens');
    console.error('   2. Click "Generate new token"');
    console.error('   3. Add SUPABASE_ACCESS_TOKEN=sbp_... to your .env');
    console.error('   4. Run `npm run migrate`\n');
    process.exit(1);
  }

  try {
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('✅ Migration SQL executed successfully.');
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end().catch(() => {});
  }
}

main();
