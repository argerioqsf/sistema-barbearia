'use client'

import { createWithdrawalAction } from '@/actions/withdrawal'
import { getUnit } from '@/actions/unit'
import { listUsersAllAction } from '@/actions/user'
import { ZUnit } from '@/features/units/schemas'
import { ZUser } from '@/features/users/schemas'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useMemo, useState } from 'react'
import { useFormState } from 'react-dom'
import { logger } from '@/shared/logger'
import { ReasonTransaction } from '@/features/transactions/schemas'
import { NormalizedError } from '@/shared/errors/types'

export function useWithdrawal(unitId?: string) {
  const [formState, formAction] = useFormState(createWithdrawalAction, {
    ok: false,
    error: {
      type: 'validation',
      issues: {
        issues: [],
      },
      message: '',
    },
  })
  const { toast } = useToast()

  const [withdrawalType, setWithdrawalType] = useState<
    'UNIT' | 'COLLABORATOR'
  >()
  const [amount, setAmount] = useState<number | undefined>()
  const [affectedUserId, setAffectedUserId] = useState<string>('')
  const [reason, setReason] = useState<ReasonTransaction | ''>('')
  const [errors, setErrors] = useState<NormalizedError>({
    type: 'validation',
    issues: {
      issues: [],
    },
    message: '',
  })

  const [collaborators, setCollaborators] = useState<ZUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<ZUser | null>(null)
  const [unit, setUnit] = useState<ZUnit | null>(null)
  const [formKey] = useState(() => Date.now())
  const [receiptFile, setReceiptFile] = useState<File>()

  const formId = 'withDrawal-form'

  // --- Data Fetching Functions ---
  const loadCollaborators = async () => {
    setIsLoading(true)
    const result = await listUsersAllAction()
    if (result.ok && result.data) {
      setCollaborators(result.data)
    }
    setIsLoading(false)
  }

  const refreshUnitData = async () => {
    if (!unitId) return
    const result = await getUnit(unitId)
    if (result.ok && result.data) {
      setUnit(result.data)
    }
  }

  // --- Effects ---
  useEffect(() => {
    loadCollaborators()
  }, [])

  useEffect(() => {
    if (withdrawalType === 'UNIT') {
      refreshUnitData()
    }
  }, [withdrawalType, unitId])

  // Handle form submission feedback
  useEffect(() => {
    if (formState.ok === false && formState.error && formState.error.message) {
      setErrors(formState.error)
      toast({
        title: 'Erro ao registrar retirada',
        description: formState.error?.message,
        variant: 'destructive',
      })
    }

    if (formState.ok === true && formState.data) {
      toast({
        title: 'Sucesso!',
        description: 'A retirada foi registrada com sucesso.',
        variant: 'success',
      })
      setErrors({
        type: 'validation',
        issues: {
          issues: [],
        },
        message: '',
      })

      if (withdrawalType === 'UNIT') {
        refreshUnitData()
      } else if (withdrawalType === 'COLLABORATOR') {
        loadCollaborators()
      }

      // Reset form
      setAmount(undefined)
      setReason('')
      // setWithdrawalType(undefined)
      setReceiptFile(undefined)
      // setFormKey(Date.now())
    }
  }, [formState, toast])

  const collaboratorOptions = useMemo(() => {
    return collaborators.map((user) => ({
      value: user.id,
      label: user.name,
    }))
  }, [collaborators])

  const unitBalance = unit?.totalBalance ?? 0
  const collaboratorBalance = selectedUser?.profile?.totalBalance ?? 0.0

  const currentBalance =
    withdrawalType === 'UNIT' ? unitBalance : collaboratorBalance
  const finalBalance = currentBalance - (amount ?? 0)

  const showSummary =
    withdrawalType === 'UNIT' ||
    (withdrawalType === 'COLLABORATOR' && !!selectedUser)

  const setAffectedUser = (userId: string) => {
    logger.debug({ userId }, 'userId')
    const userSelected = collaborators.find(
      (collaborator) => collaborator.id === userId,
    )
    if (userSelected) {
      logger.debug({ userSelected }, 'user encontrado')
      setSelectedUser(userSelected)
      setAffectedUserId(userId)
    } else {
      logger.debug('user não encontrado')
      setSelectedUser(null)
      setAffectedUserId('')
    }
  }

  return {
    formId,
    formState,
    formAction,
    formKey,
    states: {
      withdrawalType,
      amount,
      affectedUserId,
      isLoading,
      collaboratorOptions,
      showSummary,
      finalBalance,
      currentBalance,
      selectedUser,
      receiptFile,
      reason,
      errors,
    },
    setters: {
      setWithdrawalType,
      setAmount,
      setAffectedUserId,
      setAffectedUser,
      setReceiptFile,
      setReason,
    },
  }
}
