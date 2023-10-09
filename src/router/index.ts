import { Router } from 'express';
import routerSender from '../sender';

const router = Router();
router.use('/whatsender', routerSender);

export default router;
