import { Response } from "express";

import Place from "../models/place";
import { AuthRequest } from "../middleware/auth.middleware";

// GET /api/places
export const getPlaces = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const places = await Place.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

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
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const place = await Place.findOne({
      _id: req.params.id,
      user: req.userId,
    });

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
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

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
      user: req.userId,
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
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const {
      name,
      type,
      location,
      rating,
      notes,
      tags,
    } = req.body;

    const place = await Place.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      {
        name,
        type,
        location,
        rating,
        notes,
        tags,
      },
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
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const place = await Place.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

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