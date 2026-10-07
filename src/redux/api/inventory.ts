import { api } from "./core"

import { Inventory } from "@/types/inventory"

interface ClaimResponse {
  instruction: string | null
  prize_code: string | null
  help_text: string | null
  claim_url: string | null
}

const inventoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    inventory: build.query<Inventory, void>({
      query: () => ({
        url: "api/me/inventory",
        method: "GET",
      }),
      providesTags: ["Inventory"],
    }),
    claim: build.mutation<ClaimResponse, { inventory_prize_id: number }>({
      query: ({ inventory_prize_id }) => ({
        url: `api/me/inventory/${inventory_prize_id}/claim`,
        method: "POST",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
  overrideExisting: false,
})

export const { useInventoryQuery, useClaimMutation } = inventoryApi
