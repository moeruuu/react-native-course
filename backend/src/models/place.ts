import mongoose, { Document, Schema } from "mongoose";

export interface IPlace extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  type: "coffee" | "food";
  location: string;
  rating: number;
  notes: string;
  tags: string[];
  createdAt: Date;
}

const placeSchema = new Schema<IPlace>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["coffee", "food"],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model<IPlace>(
  "Place",
  placeSchema
);

export default Place;