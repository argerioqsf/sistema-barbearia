'use client'

import { Text } from '@/components/atoms'
import LinkDefault from '@/components/atoms/LinkDefault'
import { Avatar, ContainerSection } from '@/components/molecules'
import logoBarbearia from '../../../../public/logo_barbearia.png'

export default function NotFoundPage({
  href,
  absolute,
}: {
  href?: string
  absolute?: boolean
}) {
  return (
    <ContainerSection className="bg-primary-100">
      <div className="w-full bg-primary-100 flex flex-col items-center justify-center mx-auto h-svh">
        <div className="w-2/4 flex flex-col justify-center items-center pr-0">
          <Avatar
            classIcon={`size-[${100}px] bg-black`}
            size={100}
            image={logoBarbearia}
          />
          <Text className="text-4xl font-bold text-white mt-8 text-center">
            Página não encontrada
          </Text>
          {href && (
            <LinkDefault
              className="bg-white rounded-full px-6 py-4 mt-8"
              absolute={absolute}
              href={href}
            >
              <Text className="text-xl font-bold justify-center items-center uppercase text-primary-100 text-center">
                Voltar para tela inicial
              </Text>
            </LinkDefault>
          )}
        </div>
      </div>
    </ContainerSection>
  )
}
