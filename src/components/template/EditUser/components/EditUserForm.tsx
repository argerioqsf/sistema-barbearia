'use client'

import * as React from 'react'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'

import type {
  ZUser,
  ZUserService,
  ZUserProduct,
} from '@/features/users/schemas'
import type { ZRole } from '@/features/roles/schemas'
import type { ZPermission } from '@/features/permissions/api'
import type { ZService } from '@/features/services/schemas'
import type { ZProduct } from '@/features/products/schemas'
import { updateUserAction } from '@/actions/user'
import {
  ItemData,
  FormItemAssociation,
} from '@/components/organisms/Form/FormItemAssociation'

import { FormSection } from '@/components/organisms/Form/FormSection'
import { FormField } from '@/components/organisms/Form/FormField'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormMultiSelect } from '@/components/organisms/Form/FormMultiSelect'
import { DatePicker } from '@/components/ui/datepicker'
import { logger } from '@/shared/logger'

interface UserEditTemplateProps {
  formId: string
  user: ZUser
  roles: ZRole[]
  permissions: ZPermission[]
  services: ZService[]
  products: ZProduct[]
}

export function EditUserForm({
  formId,
  user,
  roles,
  permissions,
  services,
  products,
}: UserEditTemplateProps) {
  const { toast } = useToast()
  const [state, formAction] = useFormState(
    updateUserAction.bind(null, user.id),
    {
      ok: false,
      error: {
        message: '',
        type: 'unknown',
      },
    },
  )

  // State for controlled components
  const [roleId, setRoleId] = React.useState(user.profile?.roleId || '')
  const [genre, setGenre] = React.useState(user.profile?.genre || '')
  const [birthday, setBirthday] = React.useState(
    user.profile?.birthday ? new Date(user.profile.birthday) : undefined,
  )
  const [selectedPermissions, setSelectedPermissions] = React.useState<
    string[]
  >(user.profile?.permissions?.map((p: ZPermission) => p.id) || [])
  const [selectedServices, setSelectedServices] = React.useState<ItemData[]>(
    user.profile?.barberServices?.map((s: ZUserService) => ({
      ...s,
      id: s.serviceId,
    })) || [],
  )
  const [selectedProducts, setSelectedProducts] = React.useState<ItemData[]>(
    user.profile?.barberProducts?.map((p: ZUserProduct) => ({
      ...p,
      id: p.productId,
    })) || [],
  )

  logger.debug({ selectedServices }, 'selectedServices')

  const issues =
    !state.ok && state.error?.type === 'validation'
      ? state.error.issues?.issues
      : []
  const generalErrorMessage =
    !state.ok && state.error?.type !== 'validation'
      ? state.error?.message
      : undefined

  React.useEffect(() => {
    if (state.ok) {
      toast({ title: 'Usuário atualizado com sucesso!', variant: 'success' })
    } else if (generalErrorMessage) {
      toast({
        title: 'Falha ao atualizar o usuário',
        description: generalErrorMessage,
        variant: 'destructive',
      })
    }
  }, [state, generalErrorMessage, toast])

  const permissionOptions = permissions.map((p) => ({
    value: p.id,
    label: p.name,
  }))

  const selectedRole = roles.find((r) => r.id === roleId)
  const isBarber = selectedRole?.name.toUpperCase() === 'BARBER'

  const [initialServices] = React.useState<ItemData[]>(
    user.profile?.barberServices?.map((s: ZUserService) => ({
      ...s,
      id: s.serviceId,
    })) || [],
  )
  const [initialProducts] = React.useState<ItemData[]>(
    user.profile?.barberProducts?.map((p: ZUserProduct) => ({
      ...p,
      id: p.productId,
    })) || [],
  )

  const removedServiceIds = initialServices
    .filter(
      (initial) =>
        !selectedServices.some((current) => current.id === initial.id),
    )
    .map((s: ItemData) => s.id)

  const removedProductIds = initialProducts
    .filter(
      (initial) =>
        !selectedProducts.some((current) => current.id === initial.id),
    )
    .map((p: ItemData) => p.id)
  logger.debug({
    commissionPercentage: user.profile?.commissionPercentage,
  })
  return (
    <form id={formId} action={formAction} className="lg:col-span-2 space-y-6">
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
      <input
        type="hidden"
        name="removeServiceIds"
        value={JSON.stringify(removedServiceIds)}
      />
      <input
        type="hidden"
        name="removeProductIds"
        value={JSON.stringify(removedProductIds)}
      />

      <FormSection title="Dados Pessoais">
        <FormField label="Nome Completo" htmlFor="name" errors={issues}>
          <Input name="name" defaultValue={user.name} />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <Input name="email" defaultValue={user.email} readOnly disabled />
        </FormField>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Telefone" htmlFor="phone" errors={issues}>
            <Input name="phone" defaultValue={user.profile?.phone || ''} />
          </FormField>
          <FormField label="CPF" htmlFor="cpf" errors={issues}>
            <Input name="cpf" defaultValue={user.profile?.cpf || ''} />
          </FormField>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Data de Nascimento"
            htmlFor="birthday"
            errors={issues}
          >
            <DatePicker defaultValue={birthday} onSelect={setBirthday} />
          </FormField>
          <FormField label="Gênero" htmlFor="genre-select" errors={issues}>
            <Select onValueChange={setGenre} defaultValue={genre}>
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
        </div>
        <FormField label="Chave PIX" htmlFor="pix" errors={issues}>
          <Input name="pix" defaultValue={user.profile?.pix || ''} />
        </FormField>
      </FormSection>

      <FormSection title="Acesso e Papel">
        <FormField label="Papel do Usuário" htmlFor="roleId" errors={issues}>
          <Select onValueChange={setRoleId} defaultValue={roleId}>
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
      </FormSection>

      <FormSection
        title="Permissões"
        description="Defina permissões específicas para este colaborador."
      >
        <FormField label="Permissões" htmlFor="permissions" errors={issues}>
          <FormMultiSelect
            options={permissionOptions}
            selected={selectedPermissions}
            onChange={setSelectedPermissions}
            placeholder="Selecione as permissões..."
          />
        </FormField>
      </FormSection>

      {isBarber && (
        <>
          <FormSection
            title="Configurações de Colaborador"
            description="Defina comissões e serviços associados."
          >
            <FormField
              label="Comissão Padrão (%)"
              htmlFor="commissionPercentage"
              errors={issues}
            >
              <Input
                name="commissionPercentage"
                type="number"
                defaultValue={user.profile?.commissionPercentage || 0}
              />
            </FormField>
            <FormField label="Serviços Associados" errors={issues}>
              <FormItemAssociation
                itemType="service"
                items={services}
                selectedItems={selectedServices}
                onItemsChange={setSelectedServices}
              />
            </FormField>
            <FormField label="Produtos Associados" errors={issues}>
              <FormItemAssociation
                itemType="product"
                items={products}
                selectedItems={selectedProducts}
                onItemsChange={setSelectedProducts}
              />
            </FormField>
          </FormSection>
        </>
      )}

      {generalErrorMessage && (
        <p className="text-sm text-red-500 mt-4">{generalErrorMessage}</p>
      )}
    </form>
  )
}
