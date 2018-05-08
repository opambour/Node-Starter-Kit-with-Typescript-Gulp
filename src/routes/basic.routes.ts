import { Router } from 'express';
import { IndexController } from '../controllers/basic.controller';

const BasicRouter: Router = Router();

BasicRouter.get('/', IndexController);

export { BasicRouter };
