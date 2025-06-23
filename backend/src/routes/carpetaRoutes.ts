import express from "express";
import { crearCarpeta, obtenerCarpetas, eliminarCarpeta } from "../controllers/carpetaController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, obtenerCarpetas);
router.post("/", verifyToken, (req, res, next) => {
  Promise.resolve(crearCarpeta(req, res)).catch(next);
});
router.delete("/:id", verifyToken, eliminarCarpeta as any);

export default router;