import { Router } from "express";
import {
  crearEscritoConArchivo,
  listarEscritosPorExpediente,
  obtenerEscritoPorId,
  actualizarEscrito,
  eliminarEscrito,
} from "../controllers/escritosController";
import { verifyToken } from "../middleware/authMiddleware";
import multer from "multer";
import path from "path";

const router = Router();

// Configuración personalizada de multer para guardar con nombre original + timestamp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

router.get("/:id/escritos", verifyToken, listarEscritosPorExpediente);
router.post("/:id/escritos", verifyToken, upload.single("archivo"), crearEscritoConArchivo);
router.get("/escritos/:escritoId", verifyToken, obtenerEscritoPorId);
router.put("/escritos/:escritoId", verifyToken, actualizarEscrito);
router.delete("/escritos/:escritoId", verifyToken, eliminarEscrito);

export default router;