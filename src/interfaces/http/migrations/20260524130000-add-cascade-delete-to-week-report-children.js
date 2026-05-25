module.exports = {
  async up(queryInterface) {
    // achievements
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.ach_achievements
        DROP CONSTRAINT IF EXISTS ach_achievements_ach_wer_id_fkey,
        ADD CONSTRAINT ach_achievements_ach_wer_id_fkey
          FOREIGN KEY (ach_wer_id) REFERENCES task_deck.wer_week_reports(wer_id) ON DELETE CASCADE;
    `);

    // challenges
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.cha_challenges
        DROP CONSTRAINT IF EXISTS cha_challenges_cha_wer_id_fkey,
        ADD CONSTRAINT cha_challenges_cha_wer_id_fkey
          FOREIGN KEY (cha_wer_id) REFERENCES task_deck.wer_week_reports(wer_id) ON DELETE CASCADE;
    `);

    // learnings
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.lea_learnings
        DROP CONSTRAINT IF EXISTS lea_learnings_lea_wer_id_fkey,
        ADD CONSTRAINT lea_learnings_lea_wer_id_fkey
          FOREIGN KEY (lea_wer_id) REFERENCES task_deck.wer_week_reports(wer_id) ON DELETE CASCADE;
    `);

    // metrics
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.met_metrics
        DROP CONSTRAINT IF EXISTS met_metrics_met_wer_id_fkey,
        ADD CONSTRAINT met_metrics_met_wer_id_fkey
          FOREIGN KEY (met_wer_id) REFERENCES task_deck.wer_week_reports(wer_id) ON DELETE CASCADE;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.ach_achievements
        DROP CONSTRAINT IF EXISTS ach_achievements_ach_wer_id_fkey,
        ADD CONSTRAINT ach_achievements_ach_wer_id_fkey
          FOREIGN KEY (ach_wer_id) REFERENCES task_deck.wer_week_reports(wer_id);
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.cha_challenges
        DROP CONSTRAINT IF EXISTS cha_challenges_cha_wer_id_fkey,
        ADD CONSTRAINT cha_challenges_cha_wer_id_fkey
          FOREIGN KEY (cha_wer_id) REFERENCES task_deck.wer_week_reports(wer_id);
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.lea_learnings
        DROP CONSTRAINT IF EXISTS lea_learnings_lea_wer_id_fkey,
        ADD CONSTRAINT lea_learnings_lea_wer_id_fkey
          FOREIGN KEY (lea_wer_id) REFERENCES task_deck.wer_week_reports(wer_id);
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE task_deck.met_metrics
        DROP CONSTRAINT IF EXISTS met_metrics_met_wer_id_fkey,
        ADD CONSTRAINT met_metrics_met_wer_id_fkey
          FOREIGN KEY (met_wer_id) REFERENCES task_deck.wer_week_reports(wer_id);
    `);
  },
};
