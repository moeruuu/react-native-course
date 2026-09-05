import * as SecureStore from "expo-secure-store";
import { apiRequest } from "./api";

const TOKEN_KEY = "auth_token";

export async function signUp(
  name: string,
  email: string,
  password: string
) {
  const data = await apiRequest("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  await SecureStore.setItemAsync(
    TOKEN_KEY,
    data.token
  );

  return data;
}

export async function signIn(
  email: string,
  password: string
) {
  const data = await apiRequest("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  await SecureStore.setItemAsync(
    TOKEN_KEY,
    data.token
  );

  return data;
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}