import React from 'react'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Text } from '@/components/atoms'

type Props = {
  title?: string
  message?: string
}

export default function ErrorState({
  title = 'Ocorreu um erro',
  message = 'Serviço temporariamente indisponível. Tente novamente mais tarde.',
}: Props) {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Text className="uppercase font-bold text-xl lg:text-2xl text-black">
            {title}
          </Text>
          <Text className="text-red-600 mt-2">{message}</Text>
        </div>
      </div>
    </ContainerDashboard>
  )
}
