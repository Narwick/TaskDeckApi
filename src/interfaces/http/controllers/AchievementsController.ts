import { Response } from "express";
import { BaseController, newRequest } from "./BaseController";
import { AchievementsSchema } from "../schemas/AchievementsSchema";
import { AchievementsService } from "src/app/services/AchievementsService";
import { formidableFields } from "../../../utils/formidableFields";
import { saveImage } from "../../../utils/fileManager";

interface IAchievementsController {
  achievementsSchema: AchievementsSchema;
  achievementsService: AchievementsService;
}

export class AchievementsController extends BaseController<AchievementsService, AchievementsSchema> {
  achievementsSchema: AchievementsSchema;
  achievementsService: AchievementsService;
  constructor({ achievementsService, achievementsSchema }: IAchievementsController) {
    super(achievementsService, achievementsSchema);
    this.achievementsSchema = achievementsSchema;
    this.achievementsService = achievementsService;
  }

  async uploadImage(req: newRequest, res: Response) {
    const data: any = await formidableFields(req, res, ['image']);
    if (!data.image) {
      return res.status(400).send({ message: 'Imagem obrigatória.' });
    }
    const result = await saveImage('achievements', 'achievement', data.image);
    const updated = await this.achievementsService.updateById({
      id: req.params.id,
      data: { ach_image: `/storage/${result.path}` },
      sub_id: req.sub_id,
    });
    res.status(200).send(updated);
  }
}

export default AchievementsController;
