import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../services/enteties/user";
import jwt from "jsonwebtoken";

function decodeToken() {
  const token = localStorage.getItem("jwtToken");

  if (!token) return null;

  const decodedToken = { ...jwt.decode(token), jwtToken: token };
  return decodedToken;
}

const initialState = decodeToken();

export const authUser = createAsyncThunk("users/authUser", async (user) => {
  const authUser = await UserApi.authUser(user);
  return authUser;
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  const createdUser = await UserApi.createUser(user);
  return createdUser;
});

export const currentUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (currentUser, action) => {
      localStorage.removeItem("jwtToken");
      return null;
    },
  },
  extraReducers: {
    [authUser.fulfilled]: (currentUser, action) => {
      return action.payload;
    },
    [createUser.fulfilled]: (currentUser, action) => {
      return action.payload;
    },
  },
});
