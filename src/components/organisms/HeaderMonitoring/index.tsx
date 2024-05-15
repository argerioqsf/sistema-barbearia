import React from 'react'
import Image from 'next/image'

export default function HeaderMonitoring() {
  return (
    <div className="w-full relative bg-primary-100 min-h-[var(--navbar-height)] flex flex-row justify-center lg:justify-center items-center px-6">
      <div className="lg:flex absolute left-6 hidden">
        <Image
          src="/logo_madre_w.webp"
          width={150}
          height={150}
          quality={100}
          alt=""
        />
      </div>
      <h2 className="text-white font-bold">ACOMPANHAMENTO</h2>
      <div />
    </div>
  )
}
