// =====================
// node-cron Example
// =====================
const cron = require('node-cron');

// ✅ Usage Purpose: Recurring Task
const nodeTask = cron.schedule('*/5 * * * * *', () => {
  console.log(`[node-cron] ✅ Triggered at ${new Date().toLocaleTimeString()}`);
});

//  Pause / Resume: Not supported
//  Manual Trigger: Not supported
// Timezone: Not supported
// One-Time Date Schedules: Not supported
//  get  Next Runs: Not supported
//  Error Handling: Not built-in

setTimeout(() => {
  nodeTask.stop();
  console.log('[node-cron] ⛔ Stopped');
}, 20000);
