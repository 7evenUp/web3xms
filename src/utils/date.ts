export const getDays = (seconds: number) => {
  const days = Math.floor(seconds / 60 / 60 / 24)

  return days < 10 ? `0${days}` : days
}

export const getHours = (seconds: number) => {
  const hours = Math.floor(seconds / 60 / 60) % 24

  return hours < 10 ? `0${hours}` : hours
}

export const getMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60) % 60

  return minutes < 10 ? `0${minutes}` : minutes
}
