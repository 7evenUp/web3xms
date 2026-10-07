import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { RootState } from "../store"

const PUBLIC_ENDPOINTS = [
  "getIdToken",
  "obtain",
  "refresh",
  "mainPage",
  "sponsors",
]

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (PUBLIC_ENDPOINTS.includes(endpoint)) {
        return headers
      }

      const token = (getState() as RootState).authTokens.accessToken

      if (token) {
        headers.set("Authorization", token)
      }

      return headers
    },
  }),
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Profile", "Inventory"],
  endpoints: () => ({}),
})
