'use client'

import { Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { markWatched } from '@/lib/progress'

type Props = {
  src: string
  poster: string
  title: string
  courseId: string
  lessonId: string
}

/**
 * Native <video> for accessible, platform-standard controls. A large play button sits over the poster
 * until the first play, then the browser controls take over.
 */
export function VideoPlayer({ src, poster, title, courseId, lessonId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  function start() {
    setStarted(true)
    void videoRef.current?.play()
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-panel bg-ink">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        aria-label={title}
        onPlay={() => {
          setStarted(true)
          markWatched(courseId, lessonId)
        }}
        className="size-full object-cover"
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 grid cursor-pointer place-items-center bg-gradient-to-t from-ink/60 via-ink/10 to-transparent"
        >
          <span className="grid size-20 place-items-center rounded-full bg-canvas text-ink shadow-[0_8px_30px_rgb(0_0_0/0.25)] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-105 group-active:scale-95 md:size-24">
            <Play className="ml-1 size-7 fill-current md:size-8" aria-hidden />
          </span>
          <span className="sr-only">«{title}» хичээлийг тоглуулах</span>
        </button>
      )}
    </div>
  )
}
