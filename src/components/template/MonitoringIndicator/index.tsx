import { getProfile } from '@/actions/profile'
import { CardMonitoring } from '@/components/molecules/CardMonitoring'
import Search from '@/components/molecules/Search'
import Footer from '@/components/organisms/Footer'
import HeaderMonitoring from '@/components/organisms/HeaderMonitoring'
import Listing from '@/components/organisms/Listing'
import StatementComponent from '@/components/organisms/StatementComponent'
import { SearchParams, TimeLine } from '@/types/general'
import { CatalogIcons } from '@/utils/handleIcons'
import { notFound } from 'next/navigation'
import { infoList } from './templates'
import { listLeads } from '@/actions/lead'

export type Card = {
  label: string
  value: string | number
  icon: keyof CatalogIcons
  subinfo: {
    label: string
    value: string | number
  }
}

export async function MonitoringIndicator({ searchParams }: SearchParams) {
  const response = await getProfile()
  const profile = response?.response
  const errorRequest = response.error?.request ?? null
  if (!profile || profile?.role !== 'indicator') {
    notFound()
  }
  const responseLeads = await listLeads(
    searchParams?.q ?? '',
    searchParams?.page ?? '',
    profile?.id,
  )
  const list = responseLeads?.response ?? null
  const count = responseLeads?.count ?? null

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
      value: 50,
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
    <div className="w-full flex flex-col justify-start items-center">
      <HeaderMonitoring />
      <section className="flex w-full flex-col justify-start items-center min-h-[var(--height-section)] pt-8">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-14 lg:gap-20">
          {cards.map((card, idx) => (
            <CardMonitoring card={card} key={idx} />
          ))}
        </div>
        {statement.length > 0 && (
          <>
            <div className="w-full flex justify-center items-center py-20">
              <h1 className="text-3xl text-primary-100 font-bold">ESTRATO</h1>
            </div>
            <div className="w-full bg-stone-200 mb-16 px-4 lg:px-72">
              <StatementComponent timeLine={statement} />
            </div>
          </>
        )}
        <div className="w-full mt-10 mb-10 px-4 lg:px-60 flex flex-col justify-center items-center">
          <div className="w-full flex flex-row justify-center lg:justify-start items-center">
            <Search errorRequest={errorRequest} />
          </div>
          <div className="w-full mt-6 lg:mt-8 flex justify-center items-center">
            <Listing
              infoList={infoList}
              list={list}
              hrefButton="dashboard/leads/register"
              title="Leads"
              count={count}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
