'use client'

import { useMemo, useState } from 'react'
import { Button, InputForm, TitleForm, LabelForm } from '@/components/atoms'
import SelectForm from '@/components/atoms/SelectForm'
import {
  useProductsCatalog,
  useServicesCatalog,
  usePlansCatalog,
  useAppointmentsCatalog,
} from '@/modules/sales-pos/ui/hooks/useCatalog'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import type { ZProduct } from '@/features/products/schemas'
import type { ZService } from '@/features/services/schemas'
import type { ZPlan } from '@/features/plans/schema'
import type { ZAppointment } from '@/features/appointments/schemas'
import { SaleItemsList } from '@/modules/sales-pos/ui/components/organisms/SaleItemsList'

interface AddItemsProps {
  saleId: string
  prevStep?: () => void
  nextStep: () => void
}

type CatalogType = 'products' | 'services' | 'appointments' | 'plans'

export function AddItems({ saleId, prevStep, nextStep }: AddItemsProps) {
  const [selectedItemType, setSelectedItemType] =
    useState<CatalogType>('products')
  const [searchTerm, setSearchTerm] = useState('')
  const { addItem } = useSale(saleId)

  const productsQuery = useProductsCatalog(searchTerm, {
    enabled: selectedItemType === 'products',
  })
  const servicesQuery = useServicesCatalog(searchTerm, {
    enabled: selectedItemType === 'services',
  })
  const plansQuery = usePlansCatalog(searchTerm, {
    enabled: selectedItemType === 'plans',
  })
  const appointmentsQuery = useAppointmentsCatalog(searchTerm, {
    enabled: selectedItemType === 'appointments',
  })

  const selectOptions = [
    { value: 'products', label: 'Produtos' },
    { value: 'services', label: 'Serviços' },
    { value: 'appointments', label: 'Agendamentos' },
    { value: 'plans', label: 'Planos' },
  ]

  const catalogs = {
    products: productsQuery.data?.items ?? [],
    services: servicesQuery.data?.items ?? [],
    plans: plansQuery.data?.items ?? [],
    appointments: appointmentsQuery.data ?? [],
  }

  const isLoading =
    productsQuery.isLoading ||
    servicesQuery.isLoading ||
    plansQuery.isLoading ||
    appointmentsQuery.isLoading
  console.log('servicesQuery: ', servicesQuery.data)
  const currentCatalog = catalogs[selectedItemType]
  const currentCatalogLength = currentCatalog.length

  const catalogHeader = useMemo(() => {
    switch (selectedItemType) {
      case 'services':
        return 'Serviços disponíveis'
      case 'appointments':
        return 'Agendamentos próximos'
      case 'plans':
        return 'Planos ativos'
      default:
        return 'Produtos em estoque'
    }
  }, [selectedItemType])

  const handleAddProduct = (product: ZProduct) =>
    addItem({
      productId: product.id,
      quantity: 1,
      price: product.price ?? 0,
    })

  const handleAddService = (service: ZService) =>
    addItem({
      serviceId: service.id,
      quantity: 1,
      price: service.price ?? 0,
    })

  const handleAddPlan = (plan: ZPlan) =>
    addItem({
      planId: plan.id,
      quantity: 1,
      price: plan.price ?? 0,
    })

  const handleAddAppointment = (appointment: ZAppointment) =>
    addItem({
      appointmentId: appointment.id,
      quantity: 1,
    })

  const handleAddItem = (item: unknown) => {
    if (selectedItemType === 'products') {
      handleAddProduct(item as ZProduct)
    } else if (selectedItemType === 'services') {
      handleAddService(item as ZService)
    } else if (selectedItemType === 'plans') {
      handleAddPlan(item as ZPlan)
    } else {
      handleAddAppointment(item as ZAppointment)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <TitleForm
          title="Adicionar Itens"
          className="text-2xl font-semibold text-slate-900"
        />
        <p className="mt-2 text-sm text-slate-500">
          Combine produtos, serviços, planos ou agendamentos para montar a
          venda.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/70 px-6 py-6 shadow-inner shadow-slate-900/5">
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="flex flex-col gap-2">
            <LabelForm
              label="Tipo de item"
              htmlFor="itemType"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            />
            <div className="relative">
              <SelectForm
                id="itemType"
                options={selectOptions}
                value={selectedItemType}
                onChange={(e) =>
                  setSelectedItemType(e.target.value as CatalogType)
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                ▾
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <LabelForm
              label="Buscar catálogo"
              htmlFor="itemSearch"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            />
            <InputForm
              id="itemSearch"
              placeholder="Digite para buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary/40"
            />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {catalogHeader}
              </p>
              <p className="text-xs text-slate-500">
                {isLoading
                  ? 'Carregando sugestões...'
                  : currentCatalogLength > 0
                    ? 'Clique para adicionar rapidamente ao carrinho.'
                    : 'Nenhum item encontrado. Ajuste sua busca.'}
              </p>
            </div>
            <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-500">
              {currentCatalogLength} itens
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {isLoading && <LoadingSkeleton />}
            {!isLoading && currentCatalogLength === 0 && <EmptyState />}
            {!isLoading &&
              currentCatalog.map((item) => (
                <CatalogCard
                  key={getCatalogKey(item)}
                  title={getCatalogTitle(item)}
                  subtitle={getCatalogSubtitle(item)}
                  onAdd={() => handleAddItem(item)}
                />
              ))}
          </div>
        </div>
      </div>

      <SaleItemsList saleId={saleId} />

      <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Selecione todos os itens necessários antes de continuar.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {prevStep && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="h-12 w-full rounded-xl border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-white sm:w-auto"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={nextStep}
            className="h-12 w-full rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

function getCatalogKey(item: ZProduct | ZService | ZPlan | ZAppointment) {
  return item.id
}

function getCatalogTitle(
  item: ZProduct | ZService | ZPlan | ZAppointment,
): string {
  if ('name' in item && item.name) {
    return item.name as string
  }
  if ('date' in item && item.date) {
    return `Agendamento ${item.date}`
  }
  return 'Item'
}

function getCatalogSubtitle(item: ZProduct | ZService | ZPlan | ZAppointment) {
  if ('price' in item && typeof item.price === 'number') {
    return `R$ ${(item.price ?? 0).toFixed(2)}`
  }
  if ('client' in item || 'barber' in item) {
    const clientName =
      'client' in item
        ? (item.client as ZAppointment['client'])?.name
        : undefined
    const barberName =
      'barber' in item
        ? (item.barber as ZAppointment['barber'])?.name
        : undefined
    return [
      clientName && `Cliente: ${clientName}`,
      barberName && `Colaborador: ${barberName}`,
    ]
      .filter(Boolean)
      .join(' • ')
  }
  return undefined
}

function CatalogCard({
  title,
  subtitle,
  onAdd,
}: {
  title: string
  subtitle?: string
  onAdd: () => void
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div>
        <p className="text-base font-semibold text-slate-900">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      <Button
        onClick={onAdd}
        className="mt-4 h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Adicionar à venda
      </Button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center">
      <p className="text-sm font-medium text-slate-600">
        Não encontramos itens para sua busca.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Ajuste o termo ou selecione outro tipo de item para continuar.
      </p>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="col-span-full grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-40 rounded-2xl border border-slate-200 bg-slate-100/60 animate-pulse"
        />
      ))}
    </div>
  )
}
