/**
 * The brand set edge to edge, like a sign on a building. SVG `textLength` makes it fill the container
 * exactly at every width, without guessing a font size.
 */
export function Wordmark() {
  return (
    <div className="container-page py-8 md:py-12">
      <svg viewBox="0 0 1000 150" role="img" aria-label="Mentally" className="block h-auto w-full text-ink">
        <text
          x="0"
          y="138"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          className="fill-current font-display"
          style={{ fontSize: 176, fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          MENTALLY
        </text>
      </svg>
    </div>
  )
}
