'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  containerClassName?: string
}

export function OptimizedImage({
  containerClassName,
  className,
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('overflow-hidden', containerClassName)}>
      <Image
        {...props}
        alt={alt}
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'blur-lg scale-110' : 'blur-0 scale-100',
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        loading="lazy"
      />
    </div>
  )
}
