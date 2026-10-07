export interface JourneyStep {
  id: number
  title: string
  description: string
  taskLink: string | null
  order: number
  startDatetime: string
  backgroundColor: string
  tasksCount: number
  maxExpReward: number
  mediaContents: JourneyMediaContent[]
  stories: JourneyStory[]
}

export interface JourneyMediaContent {
  id: number
  order: number
  mediaContent: {
    id: number
    file: string
    type: string
  }
}

export interface JourneyStory {
  title: string
  text: string
  orderNumber: number
  additionalInfo: {
    title: string
    text: string
  }[]
}