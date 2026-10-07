import { api } from "./core"

import { Sponsors } from "@/types/sponsors"

const sponsorsApi = api.injectEndpoints({
  endpoints: (build) => ({
    sponsors: build.query<Sponsors[], void>({
      query: () => ({
        url: "api/sponsors",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSponsorsQuery } = sponsorsApi
