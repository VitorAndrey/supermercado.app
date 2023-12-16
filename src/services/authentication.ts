import axios from "axios";

import { LoginUser, RegisterUser, User } from "@models/index";

export async function registerUser(data: RegisterUser) {
  const url = "https://supermercadoapi.vercel.app/register";

  const { name, email, password } = data;

  try {
    await axios.post(url, {
      name,
      email,
      password,
    });
  } catch (error) {
    throw new Error("Error while creating a new user!");
  }
}

export async function loginUser(data: LoginUser): Promise<User> {
  const url = "https://supermercadoapi.vercel.app/login";

  const { email, password } = data;

  try {
    const { data } = await axios.post(url, {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw new Error("Error while logging in!");
  }
}
