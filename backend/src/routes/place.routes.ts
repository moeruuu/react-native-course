import { Router } from "express";

import {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/place.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getPlaces);

router.get("/:id", getPlaceById);

router.post("/", createPlace);

router.put("/:id", updatePlace);

router.delete("/:id", deletePlace);

export default router;