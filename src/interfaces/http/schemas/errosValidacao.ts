import { TypeCreateError } from "src/types";

const returnErro = (error: any, createError:TypeCreateError) => {
  let messageError = '';
  error.details.forEach((err: any) => {
    messageError += err.message;
  });

  throw createError(400, messageError);
};

const validaçaoPassword = (createError:TypeCreateError) => {
  throw createError(
    400,
    'É obrigatório que a senha tenha no mínimo 3 caracteres, ao menos 1 letra maiúscula, 1 letra minúscula e 1 número.',
  );
};

const retornaErroCpf = (createError:TypeCreateError) => {
  throw createError(400, 'É obrigatório o envio de um cpf válido.');
};

export { returnErro, validaçaoPassword, retornaErroCpf };
