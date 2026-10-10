import { createApi } from "@reduxjs/toolkit/query/react"
import { demoBaseQuery } from "@/demo/api"

export const api = createApi({
  baseQuery: demoBaseQuery,
  tagTypes: ["Profile", "Inventory", "Journey"],
  endpoints: () => ({}),
})
