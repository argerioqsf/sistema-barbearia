'use client'

import { Button, InputForm, LabelForm, TitleForm } from '@/components/atoms'
import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, X, XCircle } from 'lucide-react'
import type { ZUser } from '@/features/users/schemas'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'
import { useClientsCatalog } from '@/modules/sales-pos/ui/hooks/useCatalog'
import { useCreateSale } from '@/modules/sales-pos/ui/hooks/useCreateSale'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface ClientSelectionModalProps {
  modal: boolean
  showModal: (value: boolean) => void
  redirectBasePath?: string
}

export function ClientSelectionModal({
  modal,
  showModal,
  redirectBasePath,
}: ClientSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  const { data, isFetching } = useClientsCatalog(debouncedSearchTerm)
  const clients = useMemo(
    () =>
      ((data?.items as ZUser[] | undefined) ?? []).filter((client) =>
        client.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    [data?.items, debouncedSearchTerm],
  )
  const [selectedClient, setSelectedClient] = useState<ZUser | null>(null)
  const router = useRouter()
  const createSaleMutation = useCreateSale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const basePath = useMemo(() => {
    if (redirectBasePath) return redirectBasePath
    if (typeof window === 'undefined') return '/point-of-sale'
    const segments = window.location.pathname.split('/').filter(Boolean)
    const localeSegment = segments[0]
    return localeSegment ? `/${localeSegment}/point-of-sale` : '/point-of-sale'
  }, [redirectBasePath])

  const handleStartSale = async () => {
    if (!selectedClient) return
    const result = await createSaleMutation.mutateAsync({
      clientId: selectedClient.id,
    })
    const saleId = result?.id
    if (saleId) {
      showModal(false)
      const normalizedBasePath = basePath.endsWith('/')
        ? basePath.slice(0, -1)
        : basePath
      router.push(`${normalizedBasePath}/${saleId}`)
    }
  }

  const getInitial = (value?: string | null) => {
    if (!value) return '?'
    const trimmed = value.trim()
    return trimmed ? trimmed.charAt(0).toUpperCase() : '?'
  }

  if (!modal || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-2xl shadow-slate-900/30 sm:px-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => showModal(false)}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex flex-col gap-6">
          <div>
            <TitleForm
              title="Selecionar Cliente"
              className="text-2xl font-semibold text-slate-900"
            />
            <p className="mt-2 text-sm text-slate-500">
              Busque o cliente responsável pela venda ou informe um novo antes
              de prosseguir.
            </p>
          </div>

          {selectedClient && (
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-4 shadow-sm shadow-emerald-200/50">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                  {getInitial(selectedClient.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    {selectedClient.name}
                  </p>
                  {selectedClient.email && (
                    <p className="text-xs text-emerald-700">
                      {selectedClient.email}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedClient(null)}
                className="flex items-center gap-2 rounded-full border-emerald-300 bg-white text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50"
              >
                <XCircle className="h-4 w-4" />
                Remover
              </Button>
            </div>
          )}

          <div>
            <LabelForm
              label="Buscar Cliente"
              htmlFor="clientSearch"
              className="mb-2 text-slate-600"
            />
            <InputForm
              id="clientSearch"
              name="clientSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="Digite o nome do cliente..."
            />
            <div className="mt-4 max-h-64 space-y-2 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/60 p-2">
              {isFetching && (
                <p className="py-6 text-center text-sm text-slate-500">
                  Carregando clientes...
                </p>
              )}
              {!isFetching && debouncedSearchTerm.length <= 2 && (
                <p className="py-6 text-center text-sm text-slate-500">
                  Digite ao menos 3 caracteres para iniciar a busca.
                </p>
              )}
              {!isFetching &&
                debouncedSearchTerm.length > 2 &&
                clients.length === 0 && (
                  <p className="py-6 text-center text-sm text-slate-500">
                    Nenhum cliente encontrado. Revise o nome informado.
                  </p>
                )}
              {clients.map((client) => {
                const isSelected = selectedClient?.id === client.id
                return (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => setSelectedClient(client)}
                    className={cn(
                      'flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2',
                      isSelected
                        ? 'border-emerald-400 bg-emerald-50/80 text-emerald-900 shadow-sm shadow-emerald-200/50'
                        : 'border-transparent bg-white text-slate-700 hover:border-primary/50 hover:bg-primary/5',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                        {getInitial(client.name)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                          {client.name}
                        </span>
                        {client.email && (
                          <span className="text-xs text-slate-500">
                            {client.email}
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              onClick={() => showModal(false)}
              variant="ghost"
              className="w-full rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleStartSale}
              disabled={!selectedClient || createSaleMutation.isPending}
              className="w-full rounded-full px-6 py-2 text-sm font-semibold shadow-sm transition hover:shadow"
            >
              {createSaleMutation.isPending
                ? 'Criando...'
                : selectedClient
                  ? 'Iniciar venda'
                  : 'Confirmar seleção'}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
