import { useEffect, useState } from "react"

const sizes = {
  "sm-phone": "380px",
  phone: "480px",
  sm: "640px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "1919px",
  extra: "2000px",
}

export const useMediaQuery = (screen: keyof typeof sizes) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const query = `(min-width: ${sizes[screen]})`
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [matches, screen])

  return matches
}
