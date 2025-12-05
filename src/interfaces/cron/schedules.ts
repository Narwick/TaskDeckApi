const cron = require('node-cron');

function scheduleRotina(container: any) {
  let isRunning = true;
  if (
    process.env.DB_AMB === 'dev' ||
    process.env.DB_AMB === 'hom' ||
    process.env.DB_AMB === 'pro'
  ) {
    cron.schedule(
      '* */1 * * *',
      async () => {
        if (isRunning) {
          return;
        }

        isRunning = true;

        try {
          await container.resolve('activeRotinaJob').run();
        } catch (e) {
          console.error(e);
        } finally {
          isRunning = false;
        }
      },
      {
        scheduled: true,
        timezone: 'America/Sao_Paulo',
      },
    );
  }
}

export default function scheduleAllJobs(container: any) {
  scheduleRotina(container);
}
