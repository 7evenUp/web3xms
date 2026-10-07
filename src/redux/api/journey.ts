import { api } from "./core"

import { JourneyStep } from "@/types/journey-step"

const journeyApi = api.injectEndpoints({
  endpoints: (build) => ({
    journeySteps: build.query<JourneyStep[], void>({
      query: () => ({
        url: "api/journey-steps",
        method: "GET",
      }),
      transformResponse: (baseQueryReturnValue: JourneyStep[]) => {
        const sorted = baseQueryReturnValue.sort((a, b) => a.order - b.order)
        return sorted
      },
    }),
  }),
  overrideExisting: false,
})

export const { useJourneyStepsQuery } = journeyApi
