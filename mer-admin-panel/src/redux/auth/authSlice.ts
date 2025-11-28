import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// user type
type IUser = {
  _id: string;
  name: string;
  email: string;
  role?: string | undefined;
  image?: string | undefined;
  phone?: string | undefined;
};
type IAuth = {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
};

// Check if the cookie exists
const cookieData = Cookies.get("admin");
let initialAuthState: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: IUser | undefined;
} = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
};

// If the cookie exists, parse its value and set it as the initial state
if (cookieData) {
  try {
    const parsedData: { accessToken: string; refreshToken?: string; user: IUser } = JSON.parse(cookieData);
    initialAuthState = {
      accessToken: parsedData.accessToken,
      refreshToken: parsedData.refreshToken,
      user: parsedData.user,
    };
  } catch (error) {
    console.error("Error parsing cookie data:", error);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState:initialAuthState,
  reducers: {
    userLoggedIn: (state, { payload }: { payload: IAuth }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.user = payload.user;
      Cookies.set("admin",JSON.stringify({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          user: payload.user
        }),
        { expires: 7 } // 7 days to match refresh token expiry
      );
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = undefined;
      Cookies.remove("admin");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
