
import { Request, Response } from 'express';
import { ListAgreementService } from '../services/ListAgreementService';
import { ShowAgreementService } from '../services/ShowAgreementService';
import { CreateAgreementService } from '../services/CreateAgreementService';
import { DeleteAgreementService } from '../services/DeleteAgreementService';
import { UpdateAgreementService } from '../services/UpdateAgreementService';
export class AgreementsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listAgreements = new ListAgreementService();
      const agreement = await listAgreements.execute();
      return response.json(agreement)
    } catch (error) {
      return response.status(500).json({ error: "internal Server error" })
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const showAgreement = new ShowAgreementService();
      const agreement = await showAgreement.execute({ id });
      return response.json(agreement);
    } catch (error) {
      return response.status(500).json({ error: "internal Server error" });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name_agreement } = request.body;
    try {
      const createAgreement = new CreateAgreementService();
      const agreement = await createAgreement.execute({ name_agreement });
      return response.json(agreement);
    } catch (error) {
      return response.status(500).json({ error: "internal Server error" });
    }

  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const createAgreement = new DeleteAgreementService();
      const agreement = await createAgreement.execute({ id });
      return response.json(agreement);
    } catch (error) {
      return response.status(500).json({ error: "internal Server error" });
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name_agreement } = request.body;
    try {
      const createAgreement = new UpdateAgreementService();
      const agreement = await createAgreement.execute({ id, name_agreement });
      return response.json(agreement);
    } catch (error) {
      return response.status(500).json({ error: "internal Server error" });
    }
  }
}