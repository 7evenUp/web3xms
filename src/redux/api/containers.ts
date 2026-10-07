import { api } from "./core"

import { ContainerWonResponse, ContainersResponse } from "@/types/containers"

const containersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContainers: build.query<ContainersResponse, void>({
      query: () => ({
        url: "api/containers",
        method: "GET",
      }),
      transformResponse: (baseQueryReturnValue: ContainersResponse) => {
        const sorted = baseQueryReturnValue.containers.sort(
          (a, b) => a.order - b.order
        )
        return {
          totalCount: baseQueryReturnValue.totalCount,
          containers: sorted,
        }
      },
    }),
    openContainer: build.mutation<
      ContainerWonResponse,
      { container_id: number }
    >({
      query: ({ container_id }) => ({
        url: `api/containers/${container_id}/open`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetContainersQuery, useOpenContainerMutation } = containersApi
