const { Cron } = require('croner');

const job = new Cron('*/5 * * * * *', { timezone: 'Asia/Kolkata' }, (scheduled) => {
  console.log(`[croner] ✅ Triggered (scheduled: ${scheduled})`);
});

// Pause after 15 sec
setTimeout(() => {
  job.pause();
  console.log('[croner] ⏸️ Paused');
}, 15000);

// Resume after 25 sec
setTimeout(() => {
  job.resume();
  console.log('[croner] ▶️ Resumed');
}, 25000);

// Manual trigger at 30 sec
setTimeout(() => {
  job.trigger();
  console.log('[croner] 🔁 Manually triggered');
}, 30000);

// Stop after 40 sec
setTimeout(() => {
  job.stop();
  console.log('[croner] ⛔ Stopped');
}, 40000);

// Print next 3 run times
console.log('Next 3 runs:', job.nextRuns(3));
