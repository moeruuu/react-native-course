import { Request, Response } from "express";
import Place from "../models/place";

// GET /api/places
export const getPlaces = async (
  _req: Request,
  res: Response
) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });

    res.json(places);
  } catch (error) {
    console.error("Get places error:", error);

    res.status(500).json({
      message: "Failed to get places",
    });
  }
};

// GET /api/places/:id
export const getPlaceById = async (
  req: Request,
  res: Response
) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    res.json(place);
  } catch (error) {
    console.error("Get place error:", error);

    res.status(500).json({
      message: "Failed to get place",
    });
  }
};

// POST /api/places
export const createPlace = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      type,
      location,
      rating,
      notes,
      tags,
    } = req.body;

    if (!name || !type || !location || !rating) {
      return res.status(400).json({
        message: "Name, type, location and rating are required",
      });
    }

    const place = await Place.create({
      name,
      type,
      location,
      rating,
      notes: notes || "",
      tags: tags || [],
    });

    res.status(201).json(place);
  } catch (error) {
    console.error("Create place error:", error);

    res.status(500).json({
      message: "Failed to create place",
    });
  }
};

// PUT /api/places/:id
export const updatePlace = async (
  req: Request,
  res: Response
) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    res.json(place);
  } catch (error) {
    console.error("Update place error:", error);

    res.status(500).json({
      message: "Failed to update place",
    });
  }
};

// DELETE /api/places/:id
export const deletePlace = async (
  req: Request,
  res: Response
) => {
  try {
    const place = await Place.findByIdAndDelete(
      req.params.id
    );

    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    res.json({
      message: "Place deleted successfully",
    });
  } catch (error) {
    console.error("Delete place error:", error);

    res.status(500).json({
      message: "Failed to delete place",
    });
  }
};