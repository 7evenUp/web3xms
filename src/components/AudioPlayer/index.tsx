import { useEffect, useRef, useState, type CSSProperties } from "react"
import { Pause, Play, Xmark } from "iconoir-react"
import { useSoundContext } from "@/components/SoundProvider"
import { useJourneyStepsQuery } from "@/redux/api/journey"
import soundtrack from "@/assets/audio/new-year.mp3"
import "./styles.css"

const formatTime = (seconds: number) => {
  const value = Math.max(0, Math.floor(seconds || 0))
  return `${Math.floor(value / 60)
    .toString()
    .padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`
}
const rangeStyle = (value: number) =>
  ({ "--progress": `${value}%` }) as CSSProperties

const SkipIcon = ({ forward = false }: { forward?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    aria-hidden="true"
    style={forward ? { transform: "rotate(180deg)" } : undefined}
  >
    <path
      d="M6 5v14M18 5l-10 7 10 7V5Z"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
)
const RewindIcon = ({ forward = false }: { forward?: boolean }) => (
  <span className="audio-player__rewind">
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      style={forward ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M7 7a10 10 0 1 1-2.5 10M7 2v5H2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>15</span>
  </span>
)
const VolumeIcon = ({ muted }: { muted: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <path d="M4 9h4l5-4v14l-5-4H4V9Z" strokeLinejoin="round" />
    {muted ? (
      <path d="m17 9 5 6m0-6-5 6" />
    ) : (
      <path
        d="M17 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"
        strokeLinecap="round"
      />
    )}
  </svg>
)

const FloatingSoundPlayer = () => {
  const {
    soundSrc,
    setSoundSrc,
    isPlaying,
    isLoading,
    error,
    duration,
    position,
    volume,
    rate,
    toggle,
    seek,
    setVolume,
    setRate,
  } = useSoundContext()
  const { data: chapters } = useJourneyStepsQuery()
  const [listOpen, setListOpen] = useState(false)
  const previousVolume = useRef(0.7)
  const listButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const tracks = (chapters ?? []).flatMap((chapter) => {
    const audio = chapter.mediaContents.find(
      (item) => item.mediaContent.type === "audio",
    )
    const image = chapter.mediaContents.find(
      (item) => item.mediaContent.type === "image",
    )
    return audio
      ? [
          {
            src: audio.mediaContent.file,
            title: chapter.title,
            label:
              chapter.order === 0
                ? "Пролог"
                : chapter.order === 8
                  ? "Эпилог"
                  : `История ${chapter.order}`,
            image: image?.mediaContent.file,
          },
        ]
      : []
  })
  const index = tracks.findIndex((track) => track.src === soundSrc)
  const track = tracks[index]
  const isSoundtrack = soundSrc === soundtrack
  const title =
    track?.title ??
    (isSoundtrack ? "Рождественское путешествие" : "Аудиозапись")
  const ended = duration > 0 && position >= duration

  useEffect(() => {
    if (!listOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setListOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setListOpen(false)
        listButtonRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [listOpen])

  const selectTrack = (src: string) => {
    if (src !== soundSrc) setSoundSrc(src)
    setListOpen(false)
    listButtonRef.current?.focus()
  }

  return (
    <section ref={panelRef} className="audio-player" aria-label="Аудиоплеер">
      <div className="audio-player__topline">
        <span className="audio-player__eyebrow">
          <span
            className={`audio-player__signal${isPlaying ? " is-playing" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
            <i />
          </span>{" "}
          WEB3 X-MAS / АУДИО
        </span>
        <button
          type="button"
          className="audio-player__icon audio-player__close"
          aria-label="Закрыть аудиоплеер"
          title="Закрыть"
          onClick={() => setSoundSrc("")}
        >
          <Xmark />
        </button>
      </div>

      <div className="audio-player__info">
        <div className="audio-player__cover" aria-hidden="true">
          {track?.image ? (
            <img src={track.image} alt="" />
          ) : (
            <span>
              W3
              <br />
              XMAS
            </span>
          )}
          <span className="audio-player__cover-mark">✦</span>
        </div>
        <div className="audio-player__heading">
          <span className="audio-player__chapter">
            {track?.label ?? "Саундтрек"}
            {index >= 0 && (
              <span> / {tracks.length.toString().padStart(2, "0")}</span>
            )}
          </span>
          <h2 title={title}>{title}</h2>
          <p role="status">
            {error
              ? "Аудио недоступно"
              : isLoading
                ? "Загружаем аудио…"
                : ended
                  ? "Запись завершена"
                  : isPlaying
                    ? "Сейчас звучит"
                    : "На паузе"}
          </p>
        </div>
      </div>

      <div className="audio-player__timeline">
        <input
          type="range"
          className="audio-player__range"
          aria-label="Позиция воспроизведения"
          aria-valuetext={`${formatTime(position)} из ${formatTime(duration)}`}
          min={0}
          max={duration || 1}
          step={0.1}
          value={Math.min(position, duration)}
          disabled={!duration}
          style={rangeStyle(duration ? (position / duration) * 100 : 0)}
          onChange={(event) => seek(Number(event.target.value))}
        />
        <div className="audio-player__times">
          <span>{formatTime(position)}</span>
          <span>
            {duration ? `−${formatTime(duration - position)}` : "—:—"}
          </span>
        </div>
      </div>

      <div className="audio-player__transport">
        <button
          type="button"
          className="audio-player__icon"
          aria-label="Предыдущая запись"
          title="Предыдущая запись"
          disabled={index <= 0}
          onClick={() => selectTrack(tracks[index - 1].src)}
        >
          <SkipIcon />
        </button>
        <button
          type="button"
          className="audio-player__icon audio-player__jump"
          aria-label="Назад на 15 секунд"
          title="Назад на 15 секунд"
          disabled={!duration}
          onClick={() => seek(position - 15)}
        >
          <RewindIcon />
        </button>
        <button
          type="button"
          className="audio-player__play"
          aria-label={isPlaying ? "Пауза аудио" : "Слушать аудио"}
          title={isPlaying ? "Пауза" : "Слушать"}
          onClick={toggle}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button
          type="button"
          className="audio-player__icon audio-player__jump"
          aria-label="Вперёд на 15 секунд"
          title="Вперёд на 15 секунд"
          disabled={!duration}
          onClick={() => seek(position + 15)}
        >
          <RewindIcon forward />
        </button>
        <button
          type="button"
          className="audio-player__icon"
          aria-label="Следующая запись"
          title="Следующая запись"
          disabled={index < 0 || index >= tracks.length - 1}
          onClick={() => selectTrack(tracks[index + 1].src)}
        >
          <SkipIcon forward />
        </button>
      </div>

      <div className="audio-player__footer">
        <div className="audio-player__volume">
          <button
            type="button"
            className="audio-player__icon"
            aria-label={volume ? "Выключить звук" : "Включить звук"}
            title={volume ? "Выключить звук" : "Включить звук"}
            onClick={() => {
              if (volume) {
                previousVolume.current = volume
                setVolume(0)
              } else setVolume(previousVolume.current)
            }}
          >
            <VolumeIcon muted={!volume} />
          </button>
          <input
            type="range"
            className="audio-player__range"
            aria-label="Громкость"
            aria-valuetext={`${Math.round(volume * 100)}%`}
            min={0}
            max={1}
            step={0.01}
            value={volume}
            style={rangeStyle(volume * 100)}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </div>
        <label className="audio-player__speed" title="Скорость воспроизведения">
          <span className="sr-only">Скорость воспроизведения</span>
          <select
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
          >
            {[0.75, 1, 1.25, 1.5, 1.75, 2].map((value) => (
              <option key={value} value={value}>
                {value}×
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          ref={listButtonRef}
          className={`audio-player__list-button${listOpen ? " is-active" : ""}`}
          aria-expanded={listOpen}
          aria-controls="audio-track-list"
          onClick={() => setListOpen(!listOpen)}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M7 5h10M7 10h10M7 15h10M2 5h1M2 10h1M2 15h1" />
          </svg>{" "}
          Главы
        </button>
      </div>
      {error && (
        <p className="audio-player__error" role="alert">
          {error}
        </p>
      )}
      {listOpen && (
        <div className="audio-player__playlist" id="audio-track-list">
          <div className="audio-player__playlist-heading">
            <span>Рождественские истории</span>
            <span>{tracks.length} записей</span>
          </div>
          <ol>
            {tracks.map((item, itemIndex) => (
              <li key={item.src}>
                <button
                  type="button"
                  className={item.src === soundSrc ? "is-current" : ""}
                  aria-current={item.src === soundSrc ? "true" : undefined}
                  onClick={() => selectTrack(item.src)}
                >
                  <span className="audio-player__track-number">
                    {(itemIndex + 1).toString().padStart(2, "0")}
                  </span>
                  <span>
                    <small>{item.label}</small>
                    {item.title}
                  </span>
                  {item.src === soundSrc && (
                    <span
                      className="audio-player__track-indicator"
                      aria-label="Выбрано"
                    >
                      ✦
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}

export default FloatingSoundPlayer
