export default function BrandMark({ compact = false, className = '', imageClassName = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/brand/feus-logo-2026.webp"
        alt=""
        width="56"
        height="56"
        className={`h-12 w-12 rounded-lg object-cover shadow-lg shadow-black/15 ${imageClassName}`}
        aria-hidden="true"
      />
      {!compact && (
        <span className="flex flex-col">
          <span className="font-display text-base font-bold leading-tight text-white sm:text-lg">
            FEUS Electronics
          </span>
          <span className="mt-0.5 text-[10px] font-bold uppercase leading-tight text-feus-300">
            Group
          </span>
        </span>
      )}
    </span>
  )
}