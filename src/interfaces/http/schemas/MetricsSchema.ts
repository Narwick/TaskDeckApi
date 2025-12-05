import Joi, { required } from "joi";
import { BaseValidateClass, IValidade } from "./baseValidationClass";

import { returnErro } from "./errosValidacao";
import { TypeCreateError } from "src/types";

interface Create {
  met_tasks_completed: number;
  met_projects_advanced: number;
  met_hours_worked: number;
  met_meetings_count: number;
}

interface Update {
  data: {
    met_tasks_completed: number;
    met_projects_advanced: number;
    met_hours_worked: number;
    met_meetings_count: number;
  };
  id: number;
}

interface UpdateStatus {
  met_status: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export class MetricsSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      met_tasks_completed: this.joi.number().required(),
      met_projects_advanced: this.joi.number().required(),
      met_hours_worked: this.joi.number().required(),
      met_meetings_count: this.joi.number().required(),
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
        met_tasks_completed: this.joi.number(),
        met_projects_advanced: this.joi.number(),
        met_hours_worked: this.joi.number(),
        met_meetings_count: this.joi.number(),
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
      met_status: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: "success" };
  }
}

export default MetricsSchema;
