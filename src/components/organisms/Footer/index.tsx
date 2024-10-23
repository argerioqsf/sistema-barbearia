import React from 'react'
import { handleIcons } from '@/utils/handleIcons'
import Link from 'next/link'
import Image from 'next/image'

const Footer: React.FC = () => {
  const InstagramIcon = handleIcons('Instagram')
  const FacebookIcon = handleIcons('Facebook')
  const YoutubeIcon = handleIcons('Youtube')
  return (
    <div>
      <div className="w-screen p-8 bg-primary-100 flex flex-col items-center justify-center">
        <Image
          width={150}
          height={150}
          src="https://www.grupomadretereza.com.br/themes/cemt/assets/images/logos/logo_gmt_white.png"
          alt="NextUI hero Image"
        />

        <div className="flex flex-row justify-center item-center gap-2 mb-4 mt-4">
          <Link href="http://www.instagram.com/grupomadretereza">
            <div className="rounded-full bg-slate-100 w-8 h-8 flex items-center justify-center bg-black">
              <InstagramIcon />
            </div>
          </Link>
          <Link href="http://www.facebook.com/grupomadretereza">
            <div className="rounded-full bg-slate-100 w-8 h-8 flex items-center justify-center bg-black">
              <FacebookIcon />
            </div>
          </Link>
          <Link href="http://www.linkedin.com/FaculdadeMadreTereza">
            <div className="rounded-full bg-slate-100 w-8 h-8 flex items-center justify-center bg-black">
              <YoutubeIcon />
            </div>
          </Link>
        </div>
        <p className="text-slate-400 text-sm text-center">
          © 2021. Todos os Rireitos Reservados.
        </p>

        <p className="text-slate-400 text-sm text-center">
          Desenvolvido pelo Setor de Tecnologia da Informação!
        </p>
      </div>
    </div>
  )
}

export default Footer
