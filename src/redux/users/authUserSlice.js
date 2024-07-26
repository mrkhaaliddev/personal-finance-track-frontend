import { usersSlice } from "./usersSlice";

const USERS_URL = "/api/users";

const authUserSlice = usersSlice.injectEndpoints({
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login-User`,
        method: "POST",
        body: data,
      }),
    }),
    Logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout-User`,
        method: "POST",
      }),
    }),
    Register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    UpdateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/Update-Profile`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/get-Profile`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-image`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getValidUserJWT: builder.query({
      query: () => ({
        url: `${USERS_URL}/get-cookie`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useGetValidUserJWTQuery,
} = authUserSlice;
