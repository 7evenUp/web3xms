import { createSlice } from "@reduxjs/toolkit"

interface SoundState {
  isPlaying: boolean
}

const initialState = {
  isPlaying: false,
} as SoundState

const soundSlice = createSlice({
  name: "soundSlice",
  initialState,
  reducers: {
    soundOn: (state) => {
      state.isPlaying = true
    },
    soundOff: (state) => {
      state.isPlaying = false
    },
  },
})

export const { soundOn, soundOff } = soundSlice.actions
export default soundSlice.reducer
