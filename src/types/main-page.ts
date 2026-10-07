export interface MainPage {
  mediaContents: Array<{
    mediaContent: {
      file: string
      id: number
      type: string
    }
    order: number
  }>
  prizeFund: string
  startDatetime: string
}