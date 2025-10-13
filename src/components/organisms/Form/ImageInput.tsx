'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UploadCloud, X, RefreshCw } from 'lucide-react'
import * as React from 'react'
import Image from 'next/image'

interface ImageInputProps {
  value?: File | string
  onValueChange: (file?: File) => void
  className?: string
}

export function ImageInput({
  value,
  onValueChange,
  className,
}: ImageInputProps) {
  const [preview, setPreview] = React.useState<string | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    let objectUrl: string | null = null
    if (value instanceof File) {
      objectUrl = URL.createObjectURL(value)
      setPreview(objectUrl)
    } else if (typeof value === 'string') {
      setPreview(value)
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [value])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onValueChange(file)
    }
  }

  const handleDragEvents = (
    e: React.DragEvent<HTMLDivElement>,
    dragging: boolean,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(dragging)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      onValueChange(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onValueChange(undefined)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div
      className={cn(
        'group relative flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 transition-all',
        { 'border-primary': isDragging },
        className,
      )}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDrop={handleDrop}
    >
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {preview ? (
        <>
          <Image
            src={preview}
            alt="Preview"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => inputRef.current?.click()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 text-center text-muted-foreground"
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud className="h-10 w-10" />
          <p className="text-sm">Clique ou arraste para enviar uma imagem</p>
          <p className="text-xs">PNG, JPG, WEBP (MAX. 5MB)</p>
        </div>
      )}
    </div>
  )
}
