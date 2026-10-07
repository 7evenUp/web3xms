export interface Profile {
  avatar: string | null
  email: string
  expBalance: number
  refCode: string | null
  syncZealyMessage: "user_not_found" | null
  timezone: string
  tonAddress: string | null
  username: string
  wallet: string | null
  zealyId: string | null
  currentContainerOrderToOpen: number
}
