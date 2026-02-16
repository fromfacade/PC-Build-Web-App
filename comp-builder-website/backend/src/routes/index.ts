import { Router } from 'express';
import { partController } from '../controllers/partController';
import { buildController } from '../controllers/buildController';

const router = Router();

// Part Routes
router.get('/parts', partController.getParts);
router.get('/parts/:id', partController.getPartById as any);
router.post('/parts', partController.createPart);

// Build Routes
router.post('/builds', buildController.createBuild);
router.get('/builds/:id', buildController.getBuildById as any);

export default router;
