'use client'

import { changeActiveUnit } from '@/actions/session'
import { useTokenSync } from '@/hooks/use-token-sync'
import type { RoleName } from '@/features/roles/schemas'
import type { ZUnit } from '@/features/units/schemas'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { Combobox } from '@/components/ui/combo-box'

type UnitSwitcherProps = {
  role?: RoleName
  units?: ZUnit[]
  currentUnitId?: string
}

export function UnitSwitcher({
  role,
  units = [],
  currentUnitId,
}: UnitSwitcherProps) {
  const canSelectUnit =
    (role === 'ADMIN' || role === 'OWNER') &&
    Array.isArray(units) &&
    units.length > 0

  const { toast } = useToast()
  const router = useRouter()
  const { apply: applyToken } = useTokenSync()
  const [selectedUnit, setSelectedUnit] = useState(currentUnitId ?? '')
  const [isPending, startTransition] = useTransition()
  const autoSelectTriggeredRef = useRef(false)
  const lastSuccessfulUnitRef = useRef(currentUnitId ?? '')

  useEffect(() => {
    const nextUnitId = currentUnitId ?? ''
    setSelectedUnit(nextUnitId)
    if (nextUnitId) {
      lastSuccessfulUnitRef.current = nextUnitId
    }
  }, [currentUnitId])

  const runUnitChange = useCallback(
    async (unitId: string, showSuccessToast: boolean) => {
      const result = await changeActiveUnit(unitId)
      if (!result.ok) {
        throw new Error(result.error ?? 'Falha ao atualizar unidade')
      }
      lastSuccessfulUnitRef.current = unitId
      await applyToken({ token: result.token, unitId })
      if (showSuccessToast) {
        toast({ title: 'Unidade atualizada' })
      }
      router.refresh()
    },
    [applyToken, router, toast],
  )

  useEffect(() => {
    if (!canSelectUnit || autoSelectTriggeredRef.current) return
    if (currentUnitId || units.length === 0) return

    const fallbackUnitId = units[0]?.id
    if (!fallbackUnitId) return

    autoSelectTriggeredRef.current = true
    setSelectedUnit(fallbackUnitId)
    startTransition(async () => {
      try {
        await runUnitChange(fallbackUnitId, false)
      } catch (error) {
        console.error('Falha ao definir unidade padrão', error)
        autoSelectTriggeredRef.current = false
        setSelectedUnit('')
        toast({
          title: 'Não foi possível definir a unidade padrão',
          description:
            error instanceof Error
              ? error.message
              : 'Tente novamente mais tarde.',
          variant: 'destructive',
        })
      }
    })
  }, [canSelectUnit, currentUnitId, runUnitChange, toast, units])

  const handleChange = (unitId: string) => {
    if (unitId.length <= 0) return
    const nextUnitId = unitId
    const previousUnitId = lastSuccessfulUnitRef.current
    setSelectedUnit(nextUnitId)
    startTransition(async () => {
      try {
        await runUnitChange(nextUnitId, true)
      } catch (error) {
        setSelectedUnit(previousUnitId)
        toast({
          title: 'Não foi possível trocar a unidade',
          description:
            error instanceof Error
              ? error.message
              : 'Tente novamente mais tarde.',
          variant: 'destructive',
        })
      }
    })
  }

  if (!canSelectUnit) {
    return null
  }

  return (
    <div className="w-full min-w-[150px] max-w-[220px]">
      <label className="flex w-full flex-col gap-1 text-xs font-medium text-muted-foreground">
        <div className="relative flex items-center">
          <Combobox
            options={units.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            onValueChange={handleChange}
            value={selectedUnit}
            placeholder="Selecione uma unidade..."
            searchPlaceholder="Buscar unidade..."
            emptyPlaceholder={
              isPending ? 'Carregando...' : 'Nenhuma unidade encontrada.'
            }
            disabled={isPending}
          />
        </div>
      </label>
    </div>
  )
}
