import { Router } from "express";
import { AgreementsController } from "../controller/AgreementController";

const agreementRoutes = Router();
const agreementsController = new AgreementsController();

agreementRoutes.get('/', agreementsController.index);
agreementRoutes.get('/:id', agreementsController.show);
agreementRoutes.post('/', agreementsController.create);
agreementRoutes.put('/:id', agreementsController.update);
agreementRoutes.delete('/:id', agreementsController.delete);

export default agreementRoutes;