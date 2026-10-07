import { useState } from 'react'
import { photo, photoSet, type PhotoKey } from '../lib/photos'

interface PhotoProps {
  name: PhotoKey
  alt: string
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  width?: number
}

/** Responsive, lazy-loaded photograph with a warm placeholder tone while it loads. */
export function Photo({ name, alt, sizes = '100vw', className = '', imgClassName = '', priority, width = 1600 }: PhotoProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-paper-3 ${className}`}>
      <img
        src={photo(name, width)}
        srcSet={photoSet(name)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-1000 ease-calm ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  )
}
