import { Request, Response } from 'express';
import formidable from 'formidable';

const formidableFields = async (req: Request, res: Response, arquivo: any = [], json = false) => {
  const data = await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, function (err: any, fields: any, files: any) {
      if (err)
        return res.status(400).send({
          status: 400,
          message: 'Erro no processamento dos arquivos',
        });

      const body = json ? JSON.parse(fields.body) : fields;

      arquivo.forEach((doc: any) => {
        if (files[doc]) body[doc] = files[doc];
      });

      resolve(body);
    });
  });
  return data;
};
export { formidableFields };
