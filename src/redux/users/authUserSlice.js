import { usersSlice } from "./usersSlice";

const USERS_URL = "/api/users";

const authUserSlice = usersSlice.injectEndpoints({
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
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} = authUserSlice;
