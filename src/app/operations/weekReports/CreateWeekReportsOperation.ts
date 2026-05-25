import { WerWeekReports } from "../../../infrastructure/database/models/WerWeekReports";
import { Op, Transaction, Sequelize } from "sequelize";
import { TypeCreateError } from "../../../types";
import { WeekReportsService } from "src/app/services/WeekReportsService";
import { AchievementsService } from "src/app/services/AchievementsService";
import { ChallengesService } from "src/app/services/ChallengesService";
import { LearningsService } from "src/app/services/LearningsService";
import { MetricsService } from "src/app/services/MetricsService";
import { UserService } from "src/app/services/user/UserService";
import { CreateUserService } from "src/app/services/user/CreateUserService";
import { validCnpj } from "../../../utils/validCpfOrCnpj";

type CreateCompany = {
  wer_user_id: string;
  wer_start_date: string;
  wer_end_date: string;
  achievements: object;
  challenges: object;
  metrics: object;
  learnings: object;
};

type createCompanyType = {
  weekReportsService: WeekReportsService;
  createUserService: CreateUserService;
  userService: UserService;
  achievementsService: AchievementsService;
  challengesService: ChallengesService;
  learningsService: LearningsService;
  metricsService: MetricsService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
};

export class CreateWeekReportsOperation {
  private readonly weekReportsService: WeekReportsService;
  private readonly createUserService: CreateUserService;
  private readonly userService: UserService;
  private readonly achievementsService: AchievementsService;
  private readonly challengesService: ChallengesService;
  private readonly learningsService: LearningsService;
  private readonly metricsService: MetricsService;
  private readonly db: { sequelize: Sequelize };
  private readonly createError: TypeCreateError;
  constructor({
    weekReportsService,
    createUserService,
    userService,
    achievementsService,
    challengesService,
    learningsService,
    metricsService,
    createError,
    db,
  }: createCompanyType) {
    this.createUserService = createUserService;
    this.weekReportsService = weekReportsService;
    this.achievementsService = achievementsService;
    this.challengesService = challengesService;
    this.learningsService = learningsService;
    this.metricsService = metricsService;
    this.userService = userService;
    this.db = db;
    this.createError = createError;
  }

  public async execute(params: CreateCompany): Promise<WerWeekReports> {
    const transaction: Transaction = await this.db.sequelize.transaction();
    try {
      const werData = {
        wer_user_id: Number(params.wer_user_id),
        wer_start_date: new Date(params.wer_start_date),
        wer_end_date: new Date(params.wer_end_date),
      };
      const weekReportCreated = await this.weekReportsService.create(werData, transaction);

      const achAchievements = [];
      const achievementsData = params.achievements as Array<any>;
      for (const achievement of achievementsData) {
        const created = await this.achievementsService.create(
          {
            ach_title: achievement.ach_title,
            ach_wer_id: weekReportCreated.wer_id,
            ach_description: achievement.ach_description,
          },
          transaction
        );
        achAchievements.push(created);
      }

      const chaChallenges = [];
      const challengesData = params.challenges as Array<any>;
      for (const challenge of challengesData) {
        const created = await this.challengesService.create(
          {
            cha_title: challenge.cha_title,
            cha_wer_id: weekReportCreated.wer_id,
            cha_description: challenge.cha_description,
          },
          transaction
        );
        chaChallenges.push(created);
      }

      const leaLearnings = [];
      const learningsData = params.learnings as Array<any>;
      for (const learning of learningsData) {
        const created = await this.learningsService.create(
          {
            lea_title: learning.lea_title,
            lea_wer_id: weekReportCreated.wer_id,
            lea_description: learning.lea_description,
          },
          transaction
        );
        leaLearnings.push(created);
      }

      const metricsData: any = params.metrics;
      await this.metricsService.create(
        {
          met_wer_id: weekReportCreated.wer_id,
          met_tasks_completed: metricsData.met_tasks_completed,
          met_projects_advanced: metricsData.met_projects_advanced,
          met_hours_worked: metricsData.met_hours_worked,
          met_meetings_count: metricsData.met_meetings_count,
        },
        transaction
      );
      await transaction.commit();
      return { ...weekReportCreated, achAchievements, chaChallenges, leaLearnings };
    } catch (err: any) {
      console.log(err);
      await transaction.rollback();
      throw this.createError(
        err.status ?? 500,
        err.message ?? "Ocorreu um erro ao criar a conta. Caso o erro persista entre em contato com o administrador."
      );
    }
  }
}

export default CreateWeekReportsOperation;
