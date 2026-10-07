import { api } from "./core"

import { MainPage } from "@/types/main-page"

const mainPageApi = api.injectEndpoints({
  endpoints: (build) => ({
    mainPage: build.query<MainPage, void>({
      query: () => ({
        url: "api/main-page",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useMainPageQuery } = mainPageApi
