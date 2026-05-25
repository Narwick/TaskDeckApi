import { Response } from "express";
import { BaseController, newRequest } from "./BaseController";
import { LearningsSchema } from "../schemas/LearningsSchema";
import { LearningsService } from "src/app/services/LearningsService";
import { formidableFields } from "../../../utils/formidableFields";
import { saveImage } from "../../../utils/fileManager";

interface ILearningsController {
  learningsSchema: LearningsSchema;
  learningsService: LearningsService;
}

export class LearningsController extends BaseController<LearningsService, LearningsSchema> {
  learningsSchema: LearningsSchema;
  learningsService: LearningsService;
  constructor({ learningsService, learningsSchema }: ILearningsController) {
    super(learningsService, learningsSchema);
    this.learningsSchema = learningsSchema;
    this.learningsService = learningsService;
  }

  async uploadImage(req: newRequest, res: Response) {
    const data: any = await formidableFields(req, res, ['image']);
    if (!data.image) {
      return res.status(400).send({ message: 'Imagem obrigatória.' });
    }
    const result = await saveImage('learnings', 'learning', data.image);
    const updated = await this.learningsService.updateById({
      id: req.params.id,
      data: { lea_image: `/storage/${result.path}` },
      sub_id: req.sub_id,
    });
    res.status(200).send(updated);
  }
}

export default LearningsController;
