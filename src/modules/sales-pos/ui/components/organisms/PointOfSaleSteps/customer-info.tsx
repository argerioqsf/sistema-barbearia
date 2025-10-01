'use client'

import { useEffect, useState } from 'react'
import { Button, InputForm, LabelForm, TitleForm } from '@/components/atoms'
import type { ZUser } from '@/features/users/schemas'
import { useClientsCatalog } from '@/modules/sales-pos/ui/hooks/useCatalog'

interface CustomerInfoProps {
  setCustomer: (clientId: string) => Promise<unknown> | unknown
  nextStep: () => void
  prevStep?: () => void
  initialClientId?: string | null
  initialClient?: ZUser | null | undefined
}

export function CustomerInfo({
  setCustomer,
  nextStep,
  prevStep,
  initialClientId,
  initialClient,
}: CustomerInfoProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<ZUser | null>(
    initialClient ?? null,
  )
  const [selectedClientId, setSelectedClientId] = useState(
    initialClient?.id ?? initialClientId ?? '',
  )
  const { data, isLoading, refetch } = useClientsCatalog(searchTerm)
  const users = (data?.items as ZUser[] | undefined) ?? []
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (searchTerm.length > 2) {
      refetch()
    }
  }, [searchTerm, refetch])

  const handleNext = async () => {
    if (!selectedClientId || saving) return
    try {
      setSaving(true)
      if (selectedClientId !== initialClientId) {
        await Promise.resolve(setCustomer(selectedClientId))
      }
      nextStep()
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (initialClient) {
      setSelectedUser(initialClient)
      setSelectedClientId(initialClient.id)
      return
    }
    if (initialClientId) {
      setSelectedClientId(initialClientId)
      setSelectedUser((prev) => (prev?.id === initialClientId ? prev : null))
    }
  }, [initialClient, initialClientId])

  return (
    <div>
      <TitleForm title="Informações do Cliente" />
      <div className="mt-4">
        <LabelForm
          label="Buscar Cliente"
          htmlFor="customerName"
          className="text-lg mb-2 text-foreground"
        />
        <InputForm
          id="customerName"
          name="customerName"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary"
        />
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
          {selectedUser && (
            <div className="p-3 sm:p-4 border rounded-xl bg-primary-50/10 border-primary/60">
              <p className="font-semibold text-sm text-primary">
                Cliente selecionado
              </p>
              <p className="font-bold text-lg text-gray-900">
                {selectedUser.name}
              </p>
              <p className="text-sm text-gray-700">{selectedUser.email}</p>
            </div>
          )}
          {isLoading && (
            <p className="text-muted-foreground text-sm">Carregando...</p>
          )}
          {!isLoading && users.length === 0 && searchTerm.length > 2 && (
            <p className="text-muted-foreground text-sm">
              Nenhum cliente encontrado.
            </p>
          )}
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${selectedClientId === user.id ? 'bg-primary-50/20 border-primary shadow-lg' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedUser(user)
                setSelectedClientId(user.id)
              }}
            >
              <p className="font-bold text-lg text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>
          ))}
          {selectedClientId && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedUser(null)
                setSelectedClientId('')
              }}
              className="w-full mt-4 bg-gray-200 border-gray-300 text-gray-800 hover:bg-gray-300"
            >
              Limpar Seleção
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        {prevStep && (
          <Button
            onClick={prevStep}
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
          >
            Anterior
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!selectedClientId || saving}
          variant="default"
          className="w-full sm:w-auto hover:bg-secondary-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
        >
          {saving ? 'Salvando...' : 'Próximo'}
        </Button>
      </div>
    </div>
  )
}
