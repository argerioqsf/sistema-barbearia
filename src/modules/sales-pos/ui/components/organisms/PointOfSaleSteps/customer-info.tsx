'use client'

import { useEffect, useState } from 'react'
import { Button, InputForm, LabelForm, TitleForm } from '@/components/atoms'
import type { ZUser } from '@/features/users/schemas'
import { useClientsCatalog } from '@/modules/sales-pos/ui/hooks/useCatalog'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle } from 'lucide-react'

interface CustomerInfoProps {
  setCustomer: (clientId: string) => Promise<unknown> | unknown
  nextStep: () => void
  prevStep?: () => void
  initialClientId?: string | null
  initialClient?: ZUser | null | undefined
  isPaid: boolean
}

export function CustomerInfo({
  setCustomer,
  nextStep,
  prevStep,
  initialClientId,
  initialClient,
  isPaid,
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

  const filteredUsers = users.filter((user) => user.id !== selectedClientId)

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
    <div className="flex flex-col gap-8">
      <div>
        <TitleForm
          title="Informações do Cliente"
          className="text-2xl font-semibold text-slate-900"
        />
        <p className="mt-2 text-sm text-slate-500">
          Localize rapidamente o cliente responsável pela venda ou atualize a
          seleção antes de prosseguir.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/70 px-6 py-6 shadow-inner shadow-slate-900/5">
        {selectedUser ? (
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cliente Selecionado
            </p>
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 shadow-sm shadow-emerald-200/40">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={(selectedUser.image as string) ?? ''} />
                  <AvatarFallback>
                    {(selectedUser.name ?? '?').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-emerald-900">
                    {selectedUser.name}
                  </p>
                  <p className="text-sm text-emerald-700">
                    {selectedUser.email}
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 text-emerald-500" />
              </div>
              {!isPaid && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(null)
                    setSelectedClientId('')
                    setSearchTerm('')
                  }}
                  className="h-11 w-full rounded-xl border-emerald-300 text-sm font-medium text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100/60"
                >
                  Trocar cliente
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <LabelForm
              label="Buscar cliente"
              htmlFor="customerName"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            />
            <InputForm
              id="customerName"
              name="customerName"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite nome, e-mail ou telefone"
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary/40"
            />
            <p className="text-xs text-slate-500">
              Dica: digite ao menos três caracteres para visualizar sugestões.
            </p>
          </div>
        )}

        {searchTerm.length > 2 && !selectedUser && (
          <div className="mt-6 max-h-64 space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-white/80 p-2 pr-3">
            {isLoading && (
              <p className="p-4 text-sm text-slate-500">
                Carregando clientes...
              </p>
            )}
            {!isLoading && filteredUsers.length === 0 && (
              <p className="p-4 text-sm text-slate-500">
                Nenhum cliente encontrado para a busca.
              </p>
            )}
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => {
                  setSelectedUser(user)
                  setSelectedClientId(user.id)
                }}
                className={cn(
                  'w-full rounded-xl border border-transparent px-4 py-3 text-left transition hover:border-emerald-300 hover:bg-emerald-50/60',
                  selectedClientId === user.id &&
                    'border-emerald-400 bg-emerald-50/80',
                )}
              >
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {prevStep && (
          <Button
            onClick={prevStep}
            variant="outline"
            className="h-12 w-full rounded-xl border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-white sm:w-auto"
          >
            Voltar
          </Button>
        )}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500 sm:mr-4">
            {selectedClientId
              ? 'Cliente pronto para avançar.'
              : 'Selecione um cliente para continuar.'}
          </p>
          <Button
            onClick={handleNext}
            disabled={!selectedClientId || saving}
            className="h-12 w-full rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          >
            {saving ? 'Salvando...' : 'Continuar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
