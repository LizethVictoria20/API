import { Router } from "express";
import { Register, Login } from "../controllers/auth.controller.js";

// Nos permite hacer uso de peticiones
const router = Router();

router.post('/register', Register);
router.post('/login', Login);


export default router;
