import Joi, { required } from "joi";
import { BaseValidateClass, IValidade } from "./baseValidationClass";

import { returnErro } from "./errosValidacao";
import { TypeCreateError } from "src/types";

interface Create {
  lea_wer_id: number;
  lea_title: string;
  lea_description: string;
}

interface Update {
  data: {
    lea_wer_id: number;
    lea_title: string;
    lea_description: string;
  };
  id: number;
}

interface UpdateStatus {
  lea_status: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export class LearningsSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      lea_wer_id: this.joi.number().required(),
      lea_title: this.joi.string().required(),
      lea_description: this.joi.string().required(),
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
        lea_wer_id: this.joi.number().required(),
        lea_title: this.joi.string().required(),
        lea_description: this.joi.string().required(),
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
      lea_status: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: "success" };
  }
}

export default LearningsSchema;
