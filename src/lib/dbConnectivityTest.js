import { supabase, isSupabaseConfigured, supabaseUrl } from './supabase.js';

/**
 * HireReady Coimbatore: Database Connectivity & Integrity Test Suite
 * 
 * Verifies:
 * 1. Supabase client initialization.
 * 2. Read operations on required tables (candidates).
 * 3. Insert operations for user data flow (employer_vacancies).
 * 4. Update operations on appropriate operational entities (launch_plan_tasks).
 * 5. Delete operations ensuring zero permanent test artifacts.
 * 6. Graceful error handling on invalid queries and constraint violations.
 */
export async function runDatabaseConnectivityTest(options = {}) {
  const { adminServiceKey = null, verbose = true } = options;
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    allPassed: true,
    summary: {}
  };

  const log = (msg, extra = '') => {
    if (verbose) console.log(msg, extra);
  };

  // Helper to record test results
  const recordTest = (name, passed, details) => {
    results.tests.push({ name, passed, details });
    if (!passed) results.allPassed = false;
    log(`[${passed ? 'PASS' : 'FAIL'}] ${name}`, details ? JSON.stringify(details) : '');
  };

  log('====================================================');
  log('   HIREREADY SUPABASE CONNECTIVITY & CRUD SUITE     ');
  log('====================================================\n');

  // -------------------------------------------------------------------------
  // TEST 1: SUPABASE CLIENT INITIALIZATION
  // -------------------------------------------------------------------------
  try {
    if (isSupabaseConfigured && supabase) {
      recordTest('1. Client Initialization', true, {
        projectUrl: supabaseUrl,
        clientType: 'SupabaseClient',
        status: 'INITIALIZED'
      });
    } else {
      recordTest('1. Client Initialization', false, {
        error: 'Supabase client is not configured or failed to initialize'
      });
      return results;
    }
  } catch (err) {
    recordTest('1. Client Initialization', false, { error: err.message });
    return results;
  }

  // -------------------------------------------------------------------------
  // TEST 2: READ OPERATIONS (Required Table: candidates)
  // -------------------------------------------------------------------------
  try {
    const { data, count, error } = await supabase
      .from('candidates')
      .select('id, name, role, skills, skill_score, verification_status', { count: 'exact' });

    if (error) {
      recordTest('2. Read Operation (candidates)', false, { error: error.message, code: error.code });
    } else if (data && data.length > 0) {
      recordTest('2. Read Operation (candidates)', true, {
        rowCount: count ?? data.length,
        sampleCandidate: {
          id: data[0].id,
          name: data[0].name,
          role: data[0].role,
          skill_score: data[0].skill_score,
          status: data[0].verification_status
        }
      });
    } else {
      recordTest('2. Read Operation (candidates)', false, { error: 'No candidate records returned' });
    }
  } catch (err) {
    recordTest('2. Read Operation (candidates)', false, { error: err.message });
  }

  // -------------------------------------------------------------------------
  // TEST 3: INSERT TEST DATA (employer_vacancies)
  // -------------------------------------------------------------------------
  let transientVacancyId = null;
  try {
    const testVacancyPayload = {
      role: 'Connectivity Test Machinist',
      experience_range: '2-4 years',
      location: 'Kurichi, Coimbatore',
      salary_min: 22000,
      salary_max: 28000,
      shift_requirement: 'Day / Rotational',
      required_skills: 'Fanuc, CNC Turning, Test Metric',
      joining_timeline: 'Immediate',
      status: 'TRANSIENT_TEST'
    };

    const { data: insertedData, error: insertError } = await supabase
      .from('employer_vacancies')
      .insert(testVacancyPayload)
      .select()
      .single();

    if (insertError) {
      recordTest('3. Insert Test Data (employer_vacancies)', false, { error: insertError.message, code: insertError.code });
    } else if (insertedData?.id) {
      transientVacancyId = insertedData.id;
      recordTest('3. Insert Test Data (employer_vacancies)', true, {
        generatedId: insertedData.id,
        role: insertedData.role,
        status: insertedData.status
      });
    } else {
      recordTest('3. Insert Test Data (employer_vacancies)', false, { error: 'No record ID returned upon insert' });
    }
  } catch (err) {
    recordTest('3. Insert Test Data (employer_vacancies)', false, { error: err.message });
  }

  // -------------------------------------------------------------------------
  // TEST 4: UPDATE DATA (Operational Task in launch_plan_tasks)
  // -------------------------------------------------------------------------
  try {
    // 4.1 Update on launch_plan_tasks (has RLS UPDATE policy)
    const { data: originalTask, error: readTaskError } = await supabase
      .from('launch_plan_tasks')
      .select('task_id, is_completed')
      .eq('task_id', 't1_1')
      .single();

    if (readTaskError || !originalTask) {
      recordTest('4. Update Data (launch_plan_tasks)', false, { error: readTaskError?.message || 'Task t1_1 not found' });
    } else {
      const originalCompleted = originalTask.is_completed;
      const toggledState = !originalCompleted;

      // Perform update
      const { data: updatedTask, error: updateError } = await supabase
        .from('launch_plan_tasks')
        .update({ is_completed: toggledState })
        .eq('task_id', 't1_1')
        .select()
        .single();

      if (updateError || !updatedTask) {
        recordTest('4. Update Data (launch_plan_tasks)', false, { error: updateError?.message || 'Update failed' });
      } else {
        // Restore original state
        await supabase
          .from('launch_plan_tasks')
          .update({ is_completed: originalCompleted })
          .eq('task_id', 't1_1');

        recordTest('4. Update Data (launch_plan_tasks)', true, {
          taskId: 't1_1',
          toggledTo: toggledState,
          restoredTo: originalCompleted,
          status: 'SUCCESS & RESTORED'
        });
      }
    }
  } catch (err) {
    recordTest('4. Update Data (launch_plan_tasks)', false, { error: err.message });
  }

  // -------------------------------------------------------------------------
  // TEST 5: DELETE TEST DATA (Clean up transient record completely)
  // -------------------------------------------------------------------------
  if (transientVacancyId) {
    try {
      // Attempt deletion with the application client
      const { data: deletedData, error: deleteError } = await supabase
        .from('employer_vacancies')
        .delete()
        .eq('id', transientVacancyId)
        .select();

      let wasDeleted = deletedData && deletedData.length > 0;

      // If anon delete was restricted by RLS, clean up using admin key or direct API
      if (!wasDeleted && adminServiceKey) {
        const adminDeleteRes = await fetch(`${supabaseUrl}/rest/v1/employer_vacancies?id=eq.${transientVacancyId}`, {
          method: 'DELETE',
          headers: {
            'apikey': adminServiceKey,
            'Authorization': `Bearer ${adminServiceKey}`
          }
        });
        if (adminDeleteRes.ok) wasDeleted = true;
      }

      // Final check: ensure zero permanent test rows exist in employer_vacancies
      const { data: checkData } = await supabase
        .from('employer_vacancies')
        .select('id')
        .eq('id', transientVacancyId);

      const isClean = !checkData || checkData.length === 0;

      if (isClean) {
        recordTest('5. Delete Test Data (employer_vacancies)', true, {
          cleanedRecordId: transientVacancyId,
          permanentTestRowsRemaining: 0,
          status: 'PURGED CLEANLY'
        });
      } else {
        recordTest('5. Delete Test Data (employer_vacancies)', false, {
          error: 'Transient record could not be removed; manual cleanup required.',
          lingeringId: transientVacancyId
        });
      }
    } catch (err) {
      recordTest('5. Delete Test Data (employer_vacancies)', false, { error: err.message });
    }
  } else {
    recordTest('5. Delete Test Data', false, { error: 'Skipped due to failed insert step' });
  }

  // -------------------------------------------------------------------------
  // TEST 6: PROPER ERROR HANDLING
  // -------------------------------------------------------------------------
  try {
    // 6.1 Test reading non-existent table
    const { data: nonExistentData, error: nonExistentError } = await supabase
      .from('invalid_test_table_xyz')
      .select('*');

    const caughtNonExistent = Boolean(nonExistentError);

    // 6.2 Test inserting invalid data violating check constraint (skill_score > 100)
    const { error: constraintError } = await supabase
      .from('candidates')
      .insert({
        id: 'TEST_ERR_CANDIDATE',
        name: 'Invalid Candidate',
        role: 'Fitter',
        expected_salary: 20000,
        skill_score: 999 // Violates CHECK (skill_score BETWEEN 0 AND 100)
      });

    const caughtConstraint = Boolean(constraintError);

    if (caughtNonExistent && caughtConstraint) {
      recordTest('6. Graceful Error Handling', true, {
        nonExistentTableErrorCaught: {
          code: nonExistentError.code,
          message: nonExistentError.message
        },
        constraintViolationCaught: {
          code: constraintError.code,
          message: constraintError.message
        },
        status: 'ALL ERRORS HANDLED PROPERLY WITHOUT CRASHING'
      });
    } else {
      recordTest('6. Graceful Error Handling', false, {
        caughtNonExistent,
        caughtConstraint
      });
    }
  } catch (err) {
    recordTest('6. Graceful Error Handling', false, { error: err.message });
  }

  log('\n====================================================');
  log(`   TEST RUN COMPLETE: ${results.allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'} `);
  log('====================================================');

  results.summary = {
    total: results.tests.length,
    passed: results.tests.filter(t => t.passed).length,
    failed: results.tests.filter(t => !t.passed).length
  };

  return results;
}
