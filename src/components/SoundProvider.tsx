import { createContext, useContext, useState } from "react"

interface SoundContextData {
  soundSrc: string
  setSoundSrc: (value: string) => void
}

const SoundContext = createContext<SoundContextData | null>(null)

// The sound context exposes its hook alongside the provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useSoundContext = () => {
  const data = useContext(SoundContext)

  if (!data) {
    throw new Error("Can not `useSoundContext` outside of the SoundProvider")
  }

  return data
}

const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [soundSrc, setSoundSrc] = useState("")

  return (
    <SoundContext.Provider value={{ soundSrc, setSoundSrc }}>
      {children}
    </SoundContext.Provider>
  )
}

export default SoundProvider
