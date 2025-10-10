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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextUnitId = event.target.value
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
        <span className="uppercase tracking-[0.18em] text-muted-foreground/80">
          Unidade ativa
        </span>
        <div className="relative flex items-center">
          <select
            value={selectedUnit}
            onChange={handleChange}
            disabled={isPending}
            className="w-full appearance-none rounded-xl border border-secondary-200 bg-white px-3 py-2.5 text-sm font-semibold text-secondary-900 shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-80"
          >
            <option value="" disabled>
              Selecione uma unidade
            </option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary-100 text-secondary-foreground">
            ▼
          </span>
        </div>
      </label>
    </div>
  )
}
