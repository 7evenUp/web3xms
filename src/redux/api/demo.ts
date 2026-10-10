import { api } from "./core"
import type { Profile } from "@/types/profile"
const demoApi = api.injectEndpoints({
  endpoints: (build) => ({
    demoProgress: build.query<number[], void>({
      query: () => "demo/progress", providesTags: ["Journey"],
    }),
    completeChapter: build.mutation<Profile, { chapterId: number }>({
      query: (body) => ({ url: "demo/complete-chapter", method: "POST", body }),
      invalidatesTags: ["Profile", "Journey"],
    }),
    resetDemo: build.mutation<null, void>({
      query: () => ({ url: "demo/reset", method: "POST" }),
      invalidatesTags: ["Profile", "Inventory", "Journey"],
    }),
  }),
})
export const { useDemoProgressQuery, useCompleteChapterMutation, useResetDemoMutation } = demoApi
