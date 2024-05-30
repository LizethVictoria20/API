import { Router } from 'express';
import { getOsitos, getOsito, createOsito, updateOsito, deleteOsito } from '../controllers/ositos.controller.js';

const router = Router();

router.get('/osito', getOsitos);
router.get('/osito/:id', getOsito);

router.post('/osito', createOsito);

router.put('/osito/:id', updateOsito);

router.delete('/osito/:id', deleteOsito);


export default router;