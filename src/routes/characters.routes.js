import { Router } from 'express';
import { getOsitos, getOsito, createOsito, updateOsito, deleteOsito } from '../controllers/ositos.controller.js';

const router = Router();

router.get('/ositos', getOsitos);
router.get('/ositos/:id', getOsito);

router.post('/ositos', createOsito);

router.put('/ositos/:id', updateOsito);

router.delete('/ositos/:id', deleteOsito);


export default router;