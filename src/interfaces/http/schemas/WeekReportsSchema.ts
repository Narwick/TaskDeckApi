import Joi, { required } from "joi";
import { BaseValidateClass, IValidade } from "./baseValidationClass";

import { returnErro } from "./errosValidacao";
import { TypeCreateError } from "src/types";

interface Create {
  wer_user_id: string;
  wer_start_date: string;
  wer_end_date: string;
  achievements: object;
  challenges: object;
  metrics: object;
  learnings: object;
}

interface Update {
  data: {
    wer_start_date: string;
    wer_end_date: string;
    achievements: object;
    challenges: object;
    metrics: object;
    learnings: object;
  };
  id: number;
}

interface UpdateStatus {
  usr_status: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export class WeekReportsSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      wer_start_date: this.joi.date().required(),
      wer_end_date: this.joi.date().required(),
      achievements: this.joi
        .array()
        .items(
          this.joi.object({
            ach_title: this.joi.string().required(),
            ach_description: this.joi.string().required(),
          })
        )
        .required(),
      learnings: this.joi
        .array()
        .items(
          this.joi.object({
            lea_title: this.joi.string().required(),
            lea_description: this.joi.string().required(),
          })
        )
        .required(),
      challenges: this.joi
        .array()
        .items(
          this.joi.object({
            cha_title: this.joi.string().required(),
            cha_description: this.joi.string().required(),
          })
        )
        .required(),
      metrics: this.joi
        .object({
          met_tasks_completed: this.joi.number().required(),
          met_projects_advanced: this.joi.number().required(),
          met_hours_worked: this.joi.number().required(),
          met_meetings_count: this.joi.number().required(),
        })
        .required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: "success" };
  }

  validateUpdate(dataToValidate: Update): IValidade {
    const schema = this.joi.object({
      data: this.joi.object({
        usr_name: this.joi.string(),
        usr_email: this.joi.string().email(),
        usr_password: this.joi.string(),
      }),
      id: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: "success" };
  }

  validateUpdateStatus(dataToValidate: UpdateStatus): IValidade {
    const schema = this.joi.object({
      usr_status: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: "success" };
  }
}

export default WeekReportsSchema;
