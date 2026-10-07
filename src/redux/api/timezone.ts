import { api } from "./core"

const timezoneApi = api.injectEndpoints({
  endpoints: (build) => ({
    setTimezone: build.mutation<void, {timezone: string}>({
      query: (body) => ({
        url: "api/v1/users/set-timezone/",
        method: "POST",
        body
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSetTimezoneMutation } = timezoneApi
