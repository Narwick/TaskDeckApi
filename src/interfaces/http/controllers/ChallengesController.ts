import { Response } from "express";
import { BaseController, newRequest } from "./BaseController";
import { ChallengesSchema } from "../schemas/ChallengesSchema";
import { ChallengesService } from "src/app/services/ChallengesService";
import { formidableFields } from "../../../utils/formidableFields";
import { saveImage } from "../../../utils/fileManager";

interface IChallengesController {
  challengesSchema: ChallengesSchema;
  challengesService: ChallengesService;
}

export class ChallengesController extends BaseController<ChallengesService, ChallengesSchema> {
  challengesSchema: ChallengesSchema;
  challengesService: ChallengesService;
  constructor({ challengesService, challengesSchema }: IChallengesController) {
    super(challengesService, challengesSchema);
    this.challengesSchema = challengesSchema;
    this.challengesService = challengesService;
  }

  async uploadImage(req: newRequest, res: Response) {
    const data: any = await formidableFields(req, res, ['image']);
    if (!data.image) {
      return res.status(400).send({ message: 'Imagem obrigatória.' });
    }
    const result = await saveImage('challenges', 'challenge', data.image);
    const updated = await this.challengesService.updateById({
      id: req.params.id,
      data: { cha_image: `/storage/${result.path}` },
      sub_id: req.sub_id,
    });
    res.status(200).send(updated);
  }
}

export default ChallengesController;
