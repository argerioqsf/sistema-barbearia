'use server'

import { getProfile } from '@/actions/profile'
import { ContainerDashboard, FormFieldText } from '@/components/molecules'
import { ButtonClipBoard } from '@/components/molecules/ButtonClipBoard'
import { CardMonitoring } from '@/components/molecules/CardMonitoring'
import StatementComponent from '@/components/organisms/StatementComponent'
import { Profile, TimeLine } from '@/types/general'
import { CatalogIcons } from '@/utils/handleIcons'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'

export type Card = {
  label: string
  value: string | number
  icon: keyof CatalogIcons
  subinfo: {
    label: string
    value: string | number
  }
}

export async function MonitoringIndicator() {
  const response = await getProfile()
  const locale = useLocale()
  const profile = response?.response as
    | (Profile & {
        _count: { leadsIndicator: number }
      })
    | undefined
  if (!profile || profile?.role !== 'indicator') {
    notFound()
  }
  console.log('profile: ', profile)
  const link = `${process.env.BASE_URL}/${locale}/sim/indicator/${profile.userId}`

  const cards: Card[] = [
    {
      label: 'Valor a receber',
      value: 'R$200',
      icon: 'Banknote',
      subinfo: {
        label: 'Inicio do ciclo',
        value: '09/05/2024',
      },
    },
    {
      label: 'Leads confirmados',
      value: 20,
      icon: 'Users',
      subinfo: {
        label: 'Ultimo confirmado',
        value: '09/05/2024',
      },
    },
    {
      label: 'Leads cadastrados',
      value: profile._count.leadsIndicator ?? 0,
      icon: 'UserPlus',
      subinfo: {
        label: 'Ultimo cadastrado',
        value: '09/05/2024',
      },
    },
  ]

  const statement: TimeLine[] = [
    {
      id: '1',
      status: 'R$50,00 PAGO',
      created_at: '05/02/2024 17:40',
      title: 'teste',
      description: 'teste',
      leadsId: 'teste',
      course_id: 'teste',
    },
    {
      id: '2',
      status: 'R$50,00 PAGO',
      created_at: '05/02/2024 17:40',
      title: 'teste',
      description: 'teste',
      leadsId: 'teste',
      course_id: 'teste',
    },
    {
      id: '3',
      status: 'R$50,00 PAGO',
      created_at: '05/02/2024 17:40',
      title: 'teste',
      description: 'teste',
      leadsId: 'teste',
      course_id: 'teste',
    },
  ]

  return (
    <ContainerDashboard>
      <div className="w-full flex flex-col justify-start items-center">
        <section className="flex w-full px-12 lg:px-0 py-8 max-w-none lg:max-w-[1080px] flex-col justify-start items-center min-h-[var(--height-section)]">
          <div className="w-full pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-20 items-center justify-center">
            {cards.map((card, idx) => (
              <CardMonitoring
                last={idx === cards.length - 1}
                card={card}
                key={idx}
              />
            ))}
          </div>

          <div className="w-full pb-20 flex flex-col justify-end items-center gap-16">
            <div className="w-full bg-stone-200 rounded-md p-6 flex flex-col gap-4 lg:flex-row justify-start items-start lg:items-end">
              <div className="w-full lg:w-11/12">
                <FormFieldText
                  label="Link unico"
                  type="text"
                  value={link}
                  disabled={true}
                  error=""
                  classInput="bg-white"
                />
              </div>
              <div className="w-1/12">
                <ButtonClipBoard
                  label="Copiar"
                  value={link}
                  textToast="Link copiado"
                />
              </div>
            </div>
          </div>

          {statement.length > 0 && (
            <div className="w-full flex flex-col justify-end items-center gap-16">
              <div className="w-full flex justify-center items-center">
                <h1 className="text-3xl text-primary-100 font-bold">EXTRATO</h1>
              </div>
              <div className="w-full bg-stone-200 rounded-md px-4">
                <StatementComponent timeLine={statement} />
              </div>
            </div>
          )}
        </section>
      </div>
    </ContainerDashboard>
  )
}
