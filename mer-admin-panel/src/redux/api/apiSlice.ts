import Cookies from "js-cookie";
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

// Mutex to prevent multiple refresh token requests
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    try {
      const userInfo = Cookies.get("admin");
      if (userInfo) {
        const user = JSON.parse(userInfo);
        if (user?.accessToken) {
          headers.set("Authorization", `Bearer ${user.accessToken}`);
        }
      }
    } catch (error) {
      console.error("Error parsing user info:", error);
    }
    return headers;
  },
});

// Base query with auto-refresh token
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // Wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  
  let result = await baseQuery(args, api, extraOptions);

  // If access token expired (403 or 401)
  if (result.error && (result.error.status === 403 || result.error.status === 401)) {
    // Check if mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      
      try {
        const userInfo = Cookies.get("admin");
        
        if (userInfo) {
          const user = JSON.parse(userInfo);
          const refreshToken = user?.refreshToken;

          if (refreshToken) {
            // Try to refresh the token
            const refreshResult = await baseQuery(
              {
                url: "api/admin/refresh-token",
                method: "POST",
                body: { refreshToken },
              },
              api,
              extraOptions
            );

            if (refreshResult.data) {
              const { token } = refreshResult.data as { token: string };
              
              // Update cookie with new access token
              const updatedUser = {
                ...user,
                accessToken: token,
              };
              
              Cookies.set("admin", JSON.stringify(updatedUser), { expires: 0.5 });

              // Retry the original query with new token
              result = await baseQuery(args, api, extraOptions);
            } else {
              // Refresh token failed - logout user
              Cookies.remove("admin");
              window.location.href = "/login";
            }
          } else {
            // No refresh token - logout user
            Cookies.remove("admin");
            window.location.href = "/login";
          }
        }
      } finally {
        release();
      }
    } else {
      // Wait for the mutex to be available
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: [
    "DashboardAmount",
    "DashboardSalesReport",
    "DashboardMostSellingCategory",
    "DashboardRecentOrders",
    "AllProducts",
    "StockOutProducts",
    "AllCategory",
    "AllBrands",
    "getCategory",
    "AllOrders",
    "getBrand",
    "ReviewProducts",
    "AllCoupons",
    "Coupon",
    "AllStaff",
    "Stuff"
  ],
});
