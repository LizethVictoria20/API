import { Router } from 'express';
import { getCharacters, getCharacter, createCharacter, updateCharacter, deleleCharacter } from '../controllers/characters.controller.js';

const router = Router();

router.get('/characters', getCharacters);
router.get('/characters/:id', getCharacter);

router.post('/characters', createCharacter);

router.put('/characters/:id', updateCharacter);

router.delete('/characters/:id', deleleCharacter);


export default router;