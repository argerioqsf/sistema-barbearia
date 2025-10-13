'use client'

import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField } from '@/components/organisms/Form/FormField'
import { FormSection } from '@/components/organisms/Form/FormSection'
import { updateService } from '@/actions/service'
import type { ZCategory } from '@/features/categories/schemas'
import type { ZService } from '@/features/services/schemas'

interface EditServiceFormProps {
  formId: string
  service: ZService
  categories: ZCategory[]
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Salvando...' : 'Salvar Alterações'}
    </Button>
  )
}

export function EditServiceForm({
  formId,
  service,
  categories,
}: EditServiceFormProps) {
  const [state, formAction] = useFormState(
    updateService.bind(null, service.id),
    {
      ok: false,
      error: {
        type: 'validation',
        issues: {
          issues: [],
        },
        message: '',
      },
    },
  )
  const { toast } = useToast()
  const router = useRouter()

  const [categoryId, setCategoryId] = React.useState(service.categoryId || '')

  const issues = !state.ok
    ? state.error.type === 'validation'
      ? state.error.issues?.issues
      : undefined
    : undefined

  const generalErrorMessage =
    !state.ok && state.error.type !== 'validation'
      ? state.error.message
      : undefined

  React.useEffect(() => {
    if (state.ok) {
      toast({ title: 'Serviço atualizado com sucesso!' })
      router.push('/dashboard/services')
    } else if (generalErrorMessage) {
      toast({
        title: 'Falha ao atualizar o serviço',
        description: generalErrorMessage,
        variant: 'destructive',
      })
    }
  }, [state, router, toast, generalErrorMessage])

  return (
    <form id={formId} action={formAction} className="space-y-6">
      <input type="hidden" name="categoryId" value={categoryId} />

      <FormSection title="Informações do Serviço">
        <FormField label="Nome do Serviço" htmlFor="name" errors={issues}>
          <Input name="name" defaultValue={service.name} required />
        </FormField>

        <FormField label="Descrição" htmlFor="description" errors={issues}>
          <Textarea
            name="description"
            defaultValue={service.description || ''}
          />
        </FormField>

        <FormField label="Categoria" htmlFor="categoryId" errors={issues}>
          <Select onValueChange={setCategoryId} defaultValue={categoryId}>
            <SelectTrigger id="categoryId-select">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </FormSection>

      <FormSection title="Detalhes de Preço e Duração">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Custo (R$)" htmlFor="cost" errors={issues}>
            <Input
              name="cost"
              type="number"
              step="0.01"
              defaultValue={service.cost}
              required
            />
          </FormField>
          <FormField
            label="Preço de Venda (R$)"
            htmlFor="price"
            errors={issues}
          >
            <Input
              name="price"
              type="number"
              step="0.01"
              defaultValue={service.price}
              required
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Tempo Padrão (minutos)"
            htmlFor="defaultTime"
            errors={issues}
          >
            <Input
              name="defaultTime"
              type="number"
              defaultValue={service.defaultTime || ''}
            />
          </FormField>
          <FormField
            label="Comissão (%)"
            htmlFor="commissionPercentage"
            errors={issues}
          >
            <Input
              name="commissionPercentage"
              type="number"
              step="0.01"
              defaultValue={service.commissionPercentage || ''}
            />
          </FormField>
        </div>
      </FormSection>

      {service.imageUrl && (
        <FormSection title="Imagem do Serviço">
          <Image
            src={service.imageUrl}
            alt={`Imagem de ${service.name}`}
            width={128}
            height={128}
            className="rounded-md object-cover"
          />
        </FormSection>
      )}

      {generalErrorMessage && (
        <p className="text-sm text-red-500 mt-4">{generalErrorMessage}</p>
      )}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}
