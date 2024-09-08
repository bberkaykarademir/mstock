import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { productsApi } from "./productsApi";
// import { usersApi } from "./usersApi";
// import { expensesApi } from "./expensesApi";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: [
    "Dashboard",
    "Inventory",
    "Demands",
    "Sales",
    "Staff",
    "CompanyAssets",
    "Settings",
  ],
  endpoints: (builder) => ({
    // ...productsApi(builder),
    // ...usersApi(builder),
    // ...expensesApi(builder),
    // getDashboard: builder.query({
    //   query: () => "dashboard",
    //   providesTags: ["Dashboard"],
    // }),
    // getInventory: builder.query({
    //   query: () => "inventory",
    //   providesTags: ["Inventory"],
    // }),
    // getDemands: builder.query({
    //   query: () => "demands",
    //   providesTags: ["Demands"],
    // }),
    // getSales: builder.query({
    //   query: () => "sales",
    //   providesTags: ["Sales"],
    // }),
    // getStaff: builder.query({
    //   query: () => "staff",
    //   providesTags: ["Staff"],
    // }),
    // getCompanyAssets: builder.query({
    //   query: () => "company-assets",
    //   providesTags: ["CompanyAssets"],
    // }),
    // getSettings: builder.query({
    //   query: () => "settings",
    //   providesTags: ["Settings"],
  }),
});

export const {
  //   useGetDashboardQuery,
  //   useGetInventoryQuery,
  //   useGetDemandsQuery,
  //   useGetSalesQuery,
  //   useGetStaffQuery,
  //   useGetCompanyAssetsQuery,
  //   useGetSettingsQuery,
} = api;
