import express from "express";
import { crearCarpeta, obtenerCarpetas } from "../controllers/carpetaController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, obtenerCarpetas);
router.post("/", verifyToken, crearCarpeta);

export default router;