'use client'

import * as React from 'react'
import { useFormState } from 'react-dom'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
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
import { updateProduct } from '@/actions/product'
import type { ZCategory } from '@/features/categories/schemas'
import type { ZProduct } from '@/features/products/schemas'

interface EditProductFormProps {
  formId: string
  product: ZProduct
  categories: ZCategory[]
}

export function EditProductForm({
  formId,
  product,
  categories,
}: EditProductFormProps) {
  const [state, formAction] = useFormState(
    updateProduct.bind(null, product.id),
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

  const [categoryId, setCategoryId] = React.useState(product.categoryId || '')

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
      toast({ title: 'Produto atualizado com sucesso!', variant: 'success' })
    } else if (generalErrorMessage) {
      toast({
        title: 'Falha ao atualizar o produto',
        description: generalErrorMessage,
        variant: 'destructive',
      })
    }
  }, [state, router, toast, generalErrorMessage])

  return (
    <form id={formId} action={formAction} className="space-y-6">
      <input type="hidden" name="categoryId" value={categoryId} />

      <FormSection title="Informações do Produto">
        <FormField label="Nome do Produto" htmlFor="name" errors={issues}>
          <Input name="name" defaultValue={product.name} required />
        </FormField>

        <FormField label="Descrição" htmlFor="description" errors={issues}>
          <Textarea
            name="description"
            defaultValue={product.description || ''}
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

      <FormSection title="Detalhes de Estoque e Preço">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Quantidade em Estoque"
            htmlFor="quantity"
            errors={issues}
          >
            <Input
              name="quantity"
              type="number"
              defaultValue={product.quantity || 0}
            />
          </FormField>
          <FormField label="Custo (R$)" htmlFor="cost" errors={issues}>
            <Input
              name="cost"
              type="number"
              step="0.01"
              defaultValue={product.cost}
              required
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Preço de Venda (R$)"
            htmlFor="price"
            errors={issues}
          >
            <Input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product.price}
              required
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
              defaultValue={product.commissionPercentage || ''}
            />
          </FormField>
        </div>
      </FormSection>

      {product.imageUrl && (
        <FormSection title="Imagem do Produto">
          <Image
            src={product.imageUrl}
            alt={`Imagem de ${product.name}`}
            width={128}
            height={128}
            className="rounded-md object-cover"
          />
        </FormSection>
      )}

      {generalErrorMessage && (
        <p className="text-sm text-red-500 mt-4">{generalErrorMessage}</p>
      )}
    </form>
  )
}
