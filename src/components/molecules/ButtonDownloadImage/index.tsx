'use client'

import React from 'react'

interface ButtonDownloadImageProps {
  href: string
  name: string
}

export function ButtonDownloadImage({ href, name }: ButtonDownloadImageProps) {
  const handleDownload = (image: string) => {
    window.open(image, '_blank', 'download=image.jpg')
    const link = document.createElement('a')
    link.href = image
    link.download = `${name}.jpg`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.click()
  }
  return (
    <button
      className="w-full p-2 text-white"
      onClick={() => {
        handleDownload(href)
      }}
    >
      Abrir
    </button>
  )
}
