import { UsrUser } from "./UsrUser";
import { WerWeekReports } from "./WerWeekReports";
import { AchAchievements } from "./AchAchievements";
import { ChaChallenges } from "./ChaChallenges";
import { LeaLearnings } from "./LeaLearnings";
import { MetMetrics } from "./MetMetrics";
export function setupAssociations() {
    WerWeekReports.belongsTo(UsrUser, {
    foreignKey: "wer_user_id",
    as: "usrUser",
  });
  // WerWeekReports tem muitas conquistas
  WerWeekReports.hasMany(AchAchievements, {
    foreignKey: "ach_wer_id",
    as: "achAchievements",
  });

  // WerWeekReports tem muitos desafios
  WerWeekReports.hasMany(ChaChallenges, {
    foreignKey: "cha_wer_id",
    as: "chaChallenges",
  });

  // WerWeekReports tem muitos aprendizados
  WerWeekReports.hasMany(LeaLearnings, {
    foreignKey: "lea_wer_id",
    as: "leaLearnings",
  });

  // WerWeekReports tem uma métrica
  WerWeekReports.hasOne(MetMetrics, {
    foreignKey: "met_wer_id",
    as: "metMetrics",
  });

  // Associações inversas
  AchAchievements.belongsTo(WerWeekReports, {
    foreignKey: "ach_wer_id",
    as: "werWeekReport",
  });

  ChaChallenges.belongsTo(WerWeekReports, {
    foreignKey: "cha_wer_id",
    as: "werWeekReport",
  });

  LeaLearnings.belongsTo(WerWeekReports, {
    foreignKey: "lea_wer_id",
    as: "werWeekReport",
  });

  MetMetrics.belongsTo(WerWeekReports, {
    foreignKey: "met_wer_id",
    as: "werWeekReport",
  });
}

export default () => {
  return "AttAttachment";
};
