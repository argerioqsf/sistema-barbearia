'use client'

import { listProducts } from '@/actions/product'
import { listServices } from '@/actions/service'
import { listAppointments } from '@/actions/appointment'
import { useEffect, useState } from 'react'
import { ZProduct } from '@/features/products/schemas'
import { ZService } from '@/features/services/schemas'
import { ZAppointment } from '@/features/appointments/schemas'
import { ZPlan } from '@/features/plans/schema'
import { Button, InputForm, TitleForm, LabelForm } from '@/components/atoms'
import SelectForm from '@/components/atoms/SelectForm'
import { ZSale } from '@/features/sales/schemas'
import { listPlans } from '@/actions/plan'
import { usePOS } from '@/hooks/use-pos'

interface AddItemsProps {
  nextStep: () => void
  sale: ZSale
}

export function AddItems({ nextStep, sale }: AddItemsProps) {
  const [selectedItemType, setSelectedItemType] = useState('products')
  const [products, setProducts] = useState<ZProduct[]>([])
  const [services, setServices] = useState<ZService[]>([])
  const [appointments, setAppointments] = useState<ZAppointment[]>([])
  const [plans, setPlans] = useState<ZPlan[]>([]) // Assuming ZPlan exists
  const [searchTerm, setSearchTerm] = useState('')
  const { addPlan, addAppointment, addProduct, addService } = usePOS()

  const selectOptions = [
    { value: 'products', label: 'Produtos' },
    { value: 'services', label: 'Serviços' },
    { value: 'appointments', label: 'Agendamentos' },
    { value: 'plans', label: 'Planos' },
  ]

  useEffect(() => {
    async function loadItems() {
      if (selectedItemType === 'products') {
        const productList = await listProducts()
        if (productList.response) {
          setProducts(productList.response)
        }
      } else if (selectedItemType === 'services') {
        const serviceList = await listServices('1', { name: searchTerm })
        if (serviceList.response) {
          setServices(serviceList.response)
        }
      } else if (selectedItemType === 'appointments') {
        const appointmentList = await listAppointments('1', {
          date: searchTerm,
        })
        if (appointmentList.response) {
          setAppointments(appointmentList.response)
        }
      } else if (selectedItemType === 'plans') {
        const planList = await listPlans()
        if (planList.response) {
          setPlans(planList.response)
        }
      }
    }
    loadItems()
  }, [searchTerm, selectedItemType])

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
            onChange={(e) => setSelectedItemType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <LabelForm label="Buscar Item" htmlFor="itemSearch" />
          <InputForm
            id="itemSearch"
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 max-h-96 overflow-y-auto pr-2">
        {selectedItemType === 'products' &&
          products.map((product) => (
            <div
              key={product.id}
              className="p-5 bg-gray-100 border border-gray-200 rounded-xl flex flex-col justify-between transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:border-primary-500/50"
            >
              <div>
                <p className="font-bold text-xl text-gray-900">
                  {product.name}
                </p>
                <p className="text-lg text-gray-700 mt-1">R$ {product.price}</p>
              </div>
              <Button
                onClick={() => addProduct(product, sale.id)}
                variant="default"
              >
                Adicionar
              </Button>
            </div>
          ))}
        {selectedItemType === 'services' &&
          services.map((service) => (
            <div
              key={service.id}
              className="p-5 bg-gray-100 border border-gray-200 rounded-xl flex flex-col justify-between transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:border-primary-500/50"
            >
              <div>
                <p className="font-bold text-xl text-gray-900">
                  {service.name}
                </p>
                <p className="text-lg text-gray-700 mt-1">R$ {service.price}</p>
              </div>
              <Button
                onClick={() => addService(service, sale.id)}
                variant="default"
              >
                Adicionar
              </Button>
            </div>
          ))}
        {selectedItemType === 'appointments' &&
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-5 bg-gray-100 border border-gray-200 rounded-xl flex flex-col justify-between transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:border-primary-500/50"
            >
              <div>
                <p className="font-bold text-xl text-gray-900">
                  Agendamento: {appointment.date}
                </p>
                <p className="text-lg text-gray-700 mt-1">
                  Cliente: {appointment.client?.name}
                </p>
                <p className="text-lg text-gray-700 mt-1">
                  Barbeiro: {appointment.barber?.name}
                </p>
              </div>
              <Button
                onClick={() => addAppointment(appointment, sale.id)}
                variant="default"
              >
                Adicionar
              </Button>
            </div>
          ))}
        {selectedItemType === 'plans' &&
          plans.map((plan) => (
            <div
              key={plan.id}
              className="p-5 bg-gray-100 border border-gray-200 rounded-xl flex flex-col justify-between transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:border-primary-500/50"
            >
              <div>
                <p className="font-bold text-xl text-gray-900">
                  Plano: {plan.name}
                </p>
                <p className="text-lg text-gray-700 mt-1">R$ {plan.price}</p>
              </div>
              <Button onClick={() => addPlan(plan, sale.id)} variant="default">
                Adicionar
              </Button>
            </div>
          ))}
      </div>
      <Button onClick={nextStep} variant="default">
        Próximo
      </Button>
    </div>
  )
}
