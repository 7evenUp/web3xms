import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthTokensState {
  accessToken: string
  refreshToken: string
}

const initialState = {
  accessToken: "",
  refreshToken: "",
} as AuthTokensState

const authTokensSlice = createSlice({
  name: "authTokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<AuthTokensState>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    clearAccessToken: (state) => {
      state.accessToken = ""
    },
    clearAuthTokens: (state) => {
      state.accessToken = ""
      state.refreshToken = ""
    },
  },
})

export const { setTokens, clearAccessToken, clearAuthTokens } =
  authTokensSlice.actions
export default authTokensSlice.reducer
