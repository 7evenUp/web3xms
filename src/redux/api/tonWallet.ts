import { api } from "./core"

const tonWalletApi = api.injectEndpoints({
  endpoints: (build) => ({
    setTon: build.mutation<void, { address: string }>({
      query: (body) => ({
        url: "api/v1/users/set-ton-wallet/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
})

export const { useSetTonMutation } = tonWalletApi
