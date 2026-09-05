import * as SecureStore from "expo-secure-store";
import { apiRequest } from "./api";

const TOKEN_KEY = "auth_token";

export interface Place {
  _id: string;
  user: string;
  name: string;
  type: "coffee" | "food";
  location: string;
  rating: number;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getPlaces(): Promise<Place[]> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);

  if (!token) {
    throw new Error("You are not logged in");
  }

  return apiRequest("/api/places", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getPlaceById(
  id: string
): Promise<Place> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);

  if (!token) {
    throw new Error("You are not logged in");
  }

  return apiRequest(`/api/places/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createPlace(data: {
  name: string;
  type: "coffee" | "food";
  location: string;
  rating: number;
  notes: string;
  tags: string[];
}): Promise<Place> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);

  if (!token) {
    throw new Error("You are not logged in");
  }

  return apiRequest("/api/places", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function updatePlace(
  id: string,
  data: {
    name: string;
    type: "coffee" | "food";
    location: string;
    rating: number;
    notes: string;
    tags: string[];
  }
): Promise<Place> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);

  if (!token) {
    throw new Error("You are not logged in");
  }

  return apiRequest(`/api/places/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deletePlace(
  id: string
) {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);

  if (!token) {
    throw new Error("You are not logged in");
  }

  return apiRequest(`/api/places/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}