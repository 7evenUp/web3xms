import { api } from "./core"

const remintApi = api.injectEndpoints({
  endpoints: (build) => ({
    remint: build.mutation<{ nftLink: string }, { tx_hash: string }>({
      query: ({ tx_hash }) => ({
        url: `api/get-nutcracker-with-attributes?transaction_hash=${encodeURIComponent(tx_hash)}`,
        method: "GET",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
  overrideExisting: false,
})

export const { useRemintMutation } = remintApi
