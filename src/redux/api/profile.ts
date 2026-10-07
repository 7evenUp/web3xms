import { api } from "./core"

import { Profile } from "@/types/profile"

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query<Profile, void>({
      query: () => ({
        url: "api/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    refill: build.mutation<Profile, void>({
      query: () => ({
        url: "api/me/refill-balance",
        method: "GET",
      }),
      invalidatesTags: ["Profile"],
    }),
    syncZealy: build.mutation<Profile, void>({
      query: () => ({
        url: "api/me/zealy-sync",
        method: "GET",
      }),
    }),
    syncBalance: build.mutation<Profile, void>({
      query: () => ({
        url: "api/me/zealy-sync/balance",
        method: "GET",
      }),
      invalidatesTags: ["Profile"],
    }),
    refetchProfile: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useProfileQuery,
  useRefillMutation,
  useSyncZealyMutation,
  useSyncBalanceMutation,
  useRefetchProfileMutation,
} = profileApi
