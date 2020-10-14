import { Request, Response, Router } from "express";
import OrphanagesController from "./controller/OrphanagesController";
import multer from "multer";

import UploadConfig from "./config/upload";

const routes = Router();
const upload = multer(UploadConfig);


routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;