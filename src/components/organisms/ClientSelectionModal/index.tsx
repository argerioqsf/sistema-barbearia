'use client'

import { listClients } from '@/actions/client'
import { Button, InputForm, LabelForm, TitleForm } from '@/components/atoms'
import React, { useEffect, useState } from 'react'
import { XCircle } from 'lucide-react'
import { ZUser } from '@/features/users/schemas'
import { usePOS } from '@/hooks/use-pos'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'
type ClientSelectionModalProps = {
  modal: boolean
  showModal: (value: boolean) => void
}

export function ClientSelectionModal({
  modal,
  showModal,
}: ClientSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // 500ms debounce
  const [clients, setClients] = useState<ZUser[]>([])
  const [selectedClient, setSelectedClient] = useState<ZUser | null>(null)

  const router = useRouter()

  const { createSaleWithClient, setSale } = usePOS()

  const onStartNewSale = async (clientId: string) => {
    const newSale = await createSaleWithClient(clientId)
    if (newSale.data) {
      setSale(newSale.data)
      router.push(`/dashboard/sales/point-of-sale/${newSale.data.id}`)
    }
  }

  useEffect(() => {
    if (!modal) return

    async function loadClients() {
      const clientList = await listClients('1', { name: debouncedSearchTerm })
      console.log('clientList:', clientList)
      if (clientList.response) {
        setClients(clientList.response)
      }
    }
    if (debouncedSearchTerm.length > 2) {
      loadClients()
    } else {
      setClients([]) // Clear clients if search term is too short
    }
  }, [debouncedSearchTerm, modal])

  if (!modal) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <Button
          variant="ghost"
          onClick={() => showModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          X
        </Button>
        <TitleForm
          title="Selecionar Cliente"
          className="mb-6 text-2xl font-bold"
        />

        {selectedClient ? (
          <div className="mb-6 p-4 border border-primary-300 bg-primary-50 rounded-lg flex items-center justify-between">
            <p className="font-semibold text-lg text-primary-800">
              Cliente Selecionado: {selectedClient.name}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedClient(null)}
            >
              <XCircle className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        ) : (
          <div className="mb-6">
            <LabelForm
              label="Buscar Cliente"
              htmlFor="clientSearch"
              className="mb-2 text-gray-700"
            />
            <InputForm
              id="clientSearch"
              name="clientSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Digite o nome do cliente..."
            />
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2 border border-gray-200 rounded-md p-2">
              {clients.length === 0 && debouncedSearchTerm.length > 2 ? (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum cliente encontrado.
                </p>
              ) : clients.length === 0 && debouncedSearchTerm.length <= 2 ? (
                <p className="text-muted-foreground text-center py-4">
                  Digite pelo menos 3 caracteres para buscar.
                </p>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setSelectedClient(client)}
                  >
                    <p className="font-bold text-gray-800">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.email}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            onClick={() => showModal(false)}
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar 2
          </Button>
          <Button
            onClick={() => {
              if (selectedClient) {
                onStartNewSale(selectedClient.id)
                showModal(false)
              }
            }}
            disabled={!selectedClient}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-black font-semibold"
          >
            {selectedClient ? 'Iniciar Venda' : 'Confirmar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
