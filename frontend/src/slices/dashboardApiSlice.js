import { apiSlice } from "./apiSlice";
import { DASHBOARD_URL } from "../constants";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardDetails: builder.query({
      query: () => ({
        url: `${DASHBOARD_URL}/admin`,
      }),
      keepUnusedDataFor: 5,
    }),

    getAuthorDashboardDetails: builder.query({
      query: (id) => ({
        url: `${DASHBOARD_URL}/author`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAdminDashboardDetailsQuery,
  useGetAuthorDashboardDetailsQuery,
} = dashboardApiSlice;
