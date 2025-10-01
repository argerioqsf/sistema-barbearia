'use client'

import { useState } from 'react'
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

interface AddItemsProps {
  saleId: string
  prevStep?: () => void
  nextStep: () => void
}

export function AddItems({ saleId, prevStep, nextStep }: AddItemsProps) {
  const [selectedItemType, setSelectedItemType] = useState<
    'products' | 'services' | 'appointments' | 'plans'
  >('products')
  const [searchTerm, setSearchTerm] = useState('')
  const { addItem } = useSale(saleId)

  const productsQuery = useProductsCatalog(searchTerm)
  const servicesQuery = useServicesCatalog(searchTerm)
  const plansQuery = usePlansCatalog(searchTerm)
  const appointmentsQuery = useAppointmentsCatalog(searchTerm)

  const selectOptions = [
    { value: 'products', label: 'Produtos' },
    { value: 'services', label: 'Serviços' },
    { value: 'appointments', label: 'Agendamentos' },
    { value: 'plans', label: 'Planos' },
  ]

  const isLoading =
    productsQuery.isLoading ||
    servicesQuery.isLoading ||
    plansQuery.isLoading ||
    appointmentsQuery.isLoading

  const products =
    (productsQuery.data as { items?: ZProduct[] } | undefined)?.items ?? []
  const servicesData = servicesQuery.data as
    | { services?: ZService[]; items?: ZService[] }
    | undefined
  const services = servicesData?.services ?? servicesData?.items ?? []
  const plans =
    (plansQuery.data as { items?: ZPlan[] } | undefined)?.items ?? []
  const appointments =
    (appointmentsQuery.data as { items?: ZAppointment[] } | undefined)?.items ??
    []

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

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <TitleForm
        title="Adicionar Itens"
        className="text-3xl font-bold text-gray-900 mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <LabelForm label="Tipo de Item" htmlFor="itemType" />
          <SelectForm
            id="itemType"
            options={selectOptions}
            value={selectedItemType}
            onChange={(e) =>
              setSelectedItemType(e.target.value as typeof selectedItemType)
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <LabelForm label="Buscar" htmlFor="itemSearch" />
          <InputForm
            id="itemSearch"
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 max-h-96 overflow-y-auto pr-2">
        {isLoading && (
          <p className="text-muted-foreground col-span-full">
            Carregando itens...
          </p>
        )}
        {selectedItemType === 'products' &&
          products.map((product) => (
            <CatalogCard
              key={product.id}
              title={product.name}
              subtitle={`R$ ${product.price?.toFixed(2) ?? '0,00'}`}
              onAdd={() => handleAddProduct(product)}
            />
          ))}
        {selectedItemType === 'services' &&
          services.map((service) => (
            <CatalogCard
              key={service.id}
              title={service.name}
              subtitle={`R$ ${service.price?.toFixed(2) ?? '0,00'}`}
              onAdd={() => handleAddService(service)}
            />
          ))}
        {selectedItemType === 'appointments' &&
          appointments.map((appointment) => (
            <CatalogCard
              key={appointment.id}
              title={`Agendamento ${appointment.date}`}
              subtitle={`Cliente: ${appointment.client?.name ?? '-'} | Colaborador: ${appointment.barber?.name ?? '-'}`}
              onAdd={() => handleAddAppointment(appointment)}
            />
          ))}
        {selectedItemType === 'plans' &&
          plans.map((plan) => (
            <CatalogCard
              key={plan.id}
              title={plan.name}
              subtitle={`R$ ${plan.price?.toFixed(2) ?? '0,00'}`}
              onAdd={() => handleAddPlan(plan)}
            />
          ))}
        {!isLoading &&
          selectedItemType === 'products' &&
          products.length === 0 && (
            <EmptyState message="Nenhum produto encontrado." />
          )}
        {!isLoading &&
          selectedItemType === 'services' &&
          services.length === 0 && (
            <EmptyState message="Nenhum serviço encontrado." />
          )}
        {!isLoading &&
          selectedItemType === 'appointments' &&
          appointments.length === 0 && (
            <EmptyState message="Nenhum agendamento encontrado." />
          )}
        {!isLoading && selectedItemType === 'plans' && plans.length === 0 && (
          <EmptyState message="Nenhum plano encontrado." />
        )}
      </div>
      <div className="mt-6 flex justify-end">
        {prevStep && (
          <Button
            onClick={prevStep}
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
          >
            Anterior
          </Button>
        )}
        <Button onClick={nextStep} variant="default">
          Próximo
        </Button>
      </div>
    </div>
  )
}

interface CatalogCardProps {
  title: string
  subtitle?: string
  onAdd: () => void
}

function CatalogCard({ title, subtitle, onAdd }: CatalogCardProps) {
  return (
    <div className="p-5 bg-gray-100 border border-gray-200 rounded-xl flex flex-col justify-between hover:shadow-lg transition-transform">
      <div>
        <p className="font-bold text-xl text-gray-900">{title}</p>
        {subtitle && <p className="text-sm text-gray-700 mt-1">{subtitle}</p>}
      </div>
      <Button onClick={onAdd} variant="default" className="mt-4">
        Adicionar
      </Button>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="col-span-full text-sm text-muted-foreground text-center">
      {message}
    </p>
  )
}
