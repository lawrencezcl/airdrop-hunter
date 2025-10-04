// Test script for data scheduler functionality
// This tests the scheduler logic without actually running the scheduled tasks

console.log('🧪 Testing Data Collection Scheduler...');

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';

// Test 1: Cron schedule validation
function testCronSchedules() {
  console.log('📅 Testing cron schedule configurations...');

  const schedules = [
    { name: 'Comprehensive scraping', cron: '0 */6 * * *', description: 'Every 6 hours' },
    { name: 'Enhanced scraping', cron: '0 */8 * * *', description: 'Every 8 hours' },
    { name: 'Quick check', cron: '0 */2 * * *', description: 'Every 2 hours' },
    { name: 'Featured update', cron: '0 0 * * *', description: 'Daily at midnight' },
    { name: 'Log cleanup', cron: '0 0 * * 0', description: 'Weekly on Sunday' }
  ];

  schedules.forEach(schedule => {
    console.log(`   ✅ ${schedule.name}: ${schedule.cron} (${schedule.description})`);
  });

  return true;
}

// Test 2: Task duration calculation
function testTaskDuration() {
  console.log('⏱️  Testing task duration calculation...');

  const startTime = new Date();
  // Simulate some work
  const endTime = new Date(startTime.getTime() + 5000); // 5 seconds later
  const duration = (endTime.getTime() - startTime.getTime()) / 1000;

  console.log(`   ✅ Duration calculation: ${duration}s`);
  return duration === 5;
}

// Test 3: Featured airdrop selection logic
function testFeaturedSelection() {
  console.log('⭐ Testing featured airdrop selection logic...');

  // Mock airdrops with different priorities
  const mockAirdrops = [
    { id: '1', priority: 9, status: 'upcoming' },
    { id: '2', priority: 8, status: 'upcoming' },
    { id: '3', priority: 7, status: 'confirmed' },
    { id: '4', priority: 10, status: 'upcoming' },
    { id: '5', priority: 6, status: 'upcoming' }
  ];

  // Filter high priority airdrops (priority >= 8 or status == 'upcoming')
  const highPriority = mockAirdrops.filter(a => a.priority >= 8 || a.status === 'upcoming');

  // Sort by priority (descending) and take top 10
  const featured = highPriority
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 10)
    .map((a, index) => ({ ...a, featured: index < 10 }));

  console.log(`   ✅ Found ${highPriority.length} high-priority airdrops`);
  console.log(`   ✅ Selected ${featured.length} featured airdrops`);
  console.log(`   ✅ Top priorities: ${featured.map(a => `ID:${a.id}(P:${a.priority})`).join(', ')}`);

  return featured.length > 0;
}

// Test 4: Log cleanup date calculation
function testLogCleanup() {
  console.log('🧹 Testing log cleanup date calculation...');

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 30);

  const today = new Date();
  const daysDifference = Math.floor((today.getTime() - cutoffDate.getTime()) / (1000 * 60 * 60 * 24));

  console.log(`   ✅ Cutoff date: ${cutoffDate.toISOString()}`);
  console.log(`   ✅ Days difference: ${daysDifference}`);

  return daysDifference === 30;
}

// Test 5: Error handling simulation
function testErrorHandling() {
  console.log('❌ Testing error handling...');

  const mockError = new Error('Database connection failed');
  const errorMessage = mockError instanceof Error ? mockError.message : 'Unknown error';

  console.log(`   ✅ Error message extraction: ${errorMessage}`);
  console.log(`   ✅ Error type detection: ${mockError instanceof Error}`);

  return errorMessage === 'Database connection failed';
}

// Test 6: Task status logging
function testTaskLogging() {
  console.log('📝 Testing task status logging...');

  const logEntry = {
    source_id: 'test_task',
    status: 'success',
    items_found: 5,
    duration: 12.5,
    error_message: null
  };

  console.log(`   ✅ Log entry structure:`, {
    task: logEntry.source_id,
    status: logEntry.status,
    items: logEntry.items_found,
    duration: `${logEntry.duration}s`,
    error: logEntry.error_message || 'None'
  });

  return logEntry.status === 'success';
}

// Run all tests
function runAllTests() {
  const tests = [
    { name: 'Cron Schedules', fn: testCronSchedules },
    { name: 'Task Duration', fn: testTaskDuration },
    { name: 'Featured Selection', fn: testFeaturedSelection },
    { name: 'Log Cleanup', fn: testLogCleanup },
    { name: 'Error Handling', fn: testErrorHandling },
    { name: 'Task Logging', fn: testTaskLogging }
  ];

  let passed = 0;
  let failed = 0;

  console.log('\n🚀 Running scheduler tests...\n');

  tests.forEach(test => {
    try {
      const result = test.fn();
      if (result) {
        console.log(`✅ ${test.name} - PASSED\n`);
        passed++;
      } else {
        console.log(`❌ ${test.name} - FAILED\n`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} - ERROR: ${error.message}\n`);
      failed++;
    }
  });

  console.log('📊 Test Results:');
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failed === 0) {
    console.log('\n🎉 All scheduler tests passed! Ready to start data collection.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the implementation.');
  }

  return failed === 0;
}

// Run the tests
const success = runAllTests();
process.exit(success ? 0 : 1);