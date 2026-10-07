export interface ContainersResponse {
  containers: Container[]
  totalCount: number
}

export interface Container {
  id: number
  image: string | null
  isVisible: boolean
  name: string
  order: number
  price: number
  prizes: PrizeResponse[]
}

export interface ContainerWonResponse {
  link: string
  prize: Prize
}

export interface PrizeResponse {
  numberInContainer: number
  prize: Prize
}

export interface Prize {
  backgroundColor: null | string
  description: string
  id: number
  image: null | string
  link: null | string
  photos: Array<{
    id: number
    file: string
    orderNumber: number
  }>
  rarity: string
  title: string
  totalCountForUser: number
}
