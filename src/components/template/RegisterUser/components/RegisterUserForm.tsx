'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { ZRole } from '@/features/roles/schemas'
import { createUserAction } from '@/actions/user'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField } from '@/components/organisms/Form/FormField'
import { FormSection } from '@/components/organisms/Form/FormSection'
import { DatePicker } from '@/components/ui/datepicker'
import { FormMultiSelect } from '@/components/organisms/Form/FormMultiSelect'
import { ZPermission } from '@/features/permissions/schemas'
import { FormItemAssociation } from '@/components/organisms/Form/FormItemAssociation'
import { ZService } from '@/features/services/schemas'
import { ZProduct } from '@/features/products/schemas'
import { CommissionCalcType } from '@/features/users/schemas'

type RegisterUserFormProps = {
  roles: ZRole[]
  permissions: ZPermission[]
  services: ZService[]
  products: ZProduct[]
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Criando...' : 'Criar Usuário'}
    </Button>
  )
}

export function RegisterUserForm({
  roles,
  permissions,
  services,
  products,
}: RegisterUserFormProps) {
  const [state, formAction] = useFormState(createUserAction, {
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
  const router = useRouter()

  const [roleId, setRoleId] = useState('')
  const [genre, setGenre] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<
    {
      id: string
      commissionPercentage?: number
      commissionType?: CommissionCalcType
      time?: number
    }[]
  >([])
  const [selectedProducts, setSelectedProducts] = useState<
    {
      id: string
      commissionPercentage?: number
      commissionType?: CommissionCalcType
    }[]
  >([])

  const issues = !state.ok
    ? state.error.type === 'validation'
      ? state.error.issues?.issues
      : []
    : []

  const generalErrorMessage =
    !state.ok && state.error.type !== 'validation'
      ? state.error.message
      : undefined

  useEffect(() => {
    if (state.ok) {
      toast({ title: 'Usuário criado com sucesso!' })
      router.push('/dashboard/users')
    } else if (generalErrorMessage) {
      toast({
        title: 'Erro ao criar usuário',
        description: generalErrorMessage,
        variant: 'destructive',
      })
    }
  }, [state, toast, router, generalErrorMessage])

  const permissionOptions = permissions.map((p) => ({
    label: p.name,
    value: p.id,
  }))

  const userIsBarber = roles.find((r) => r.name === 'BARBER')?.id === roleId

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden inputs for custom components */}
      <input type="hidden" name="roleId" value={roleId} />
      <input type="hidden" name="genre" value={genre} />
      <input
        type="hidden"
        name="permissions"
        value={JSON.stringify(selectedPermissions)}
      />
      <input
        type="hidden"
        name="services"
        value={JSON.stringify(selectedServices)}
      />
      <input
        type="hidden"
        name="products"
        value={JSON.stringify(selectedProducts)}
      />

      <FormSection title="Informações Pessoais">
        <FormField label="Nome" htmlFor="name" errors={issues}>
          <Input name="name" required />
        </FormField>
        <FormField label="Telefone" htmlFor="phone" errors={issues}>
          <Input name="phone" />
        </FormField>
        <FormField label="CPF" htmlFor="cpf" errors={issues}>
          <Input name="cpf" />
        </FormField>
        <FormField label="Data de Nascimento" htmlFor="birthday">
          <DatePicker name="birthday" />
        </FormField>
        <FormField label="Gênero" htmlFor="genre-select" errors={issues}>
          <Select onValueChange={setGenre}>
            <SelectTrigger id="genre-select">
              <SelectValue placeholder="Selecione o gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Masculino</SelectItem>
              <SelectItem value="FEMALE">Feminino</SelectItem>
              <SelectItem value="OTHER">Outro</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Chave PIX" htmlFor="pix" errors={issues}>
          <Input name="pix" />
        </FormField>
      </FormSection>

      <FormSection title="Acesso e Permissões">
        <FormField label="Email" htmlFor="email" errors={issues}>
          <Input name="email" type="email" required />
        </FormField>
        <FormField label="Senha" htmlFor="password" errors={issues}>
          <Input name="password" type="password" required />
        </FormField>
        <FormField label="Papel" htmlFor="roleId" errors={issues}>
          <Select onValueChange={setRoleId}>
            <SelectTrigger id="roleId-select">
              <SelectValue placeholder="Selecione um papel" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Permissões" htmlFor="permissions" errors={issues}>
          <FormMultiSelect
            options={permissionOptions}
            selected={selectedPermissions}
            onChange={setSelectedPermissions}
            placeholder="Selecione as permissões"
          />
        </FormField>
      </FormSection>

      {userIsBarber && (
        <FormSection title="Configurações de Colaborador">
          <FormField
            label="Comissão (%)"
            htmlFor="commissionPercentage"
            errors={issues}
          >
            <Input name="commissionPercentage" type="number" />
          </FormField>
          <FormField label="Serviços" htmlFor="services" errors={issues}>
            <FormItemAssociation
              items={services}
              selectedItems={selectedServices}
              onItemsChange={setSelectedServices}
              itemType="service"
            />
          </FormField>
          <FormField label="Produtos" htmlFor="products" errors={issues}>
            <FormItemAssociation
              items={products}
              selectedItems={selectedProducts}
              onItemsChange={setSelectedProducts}
              itemType="product"
            />
          </FormField>
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
