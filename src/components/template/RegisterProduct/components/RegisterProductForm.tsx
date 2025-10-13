'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField } from '@/components/organisms/Form/FormField'
import { FormSection } from '@/components/organisms/Form/FormSection'
import { registerProduct } from '@/actions/product'
import type { ZCategory } from '@/features/categories/schemas'

type RegisterProductFormProps = {
  categories: ZCategory[]
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Criando...' : 'Criar Produto'}
    </Button>
  )
}

export function RegisterProductForm({ categories }: RegisterProductFormProps) {
  const [state, formAction] = useFormState(registerProduct, {
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

  const [categoryId, setCategoryId] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

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
      toast({ title: 'Produto criado com sucesso!' })
      router.push('/dashboard/products')
    } else if (generalErrorMessage) {
      toast({
        title: 'Erro ao criar produto',
        description: generalErrorMessage,
        variant: 'destructive',
      })
    }
  }, [state, toast, router, generalErrorMessage])

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="categoryId" value={categoryId} />

      <FormSection title="Informações do Produto">
        <FormField label="Nome do Produto" htmlFor="name" errors={issues}>
          <Input name="name" required />
        </FormField>

        <FormField label="Descrição" htmlFor="description" errors={issues}>
          <Textarea name="description" />
        </FormField>

        <FormField label="Categoria" htmlFor="categoryId" errors={issues}>
          <Select onValueChange={setCategoryId}>
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
            <Input name="quantity" type="number" defaultValue={0} />
          </FormField>
          <FormField label="Custo (R$)" htmlFor="cost" errors={issues}>
            <Input name="cost" type="number" step="0.01" required />
          </FormField>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Preço de Venda (R$)"
            htmlFor="price"
            errors={issues}
          >
            <Input name="price" type="number" step="0.01" required />
          </FormField>
          <FormField
            label="Comissão (%)"
            htmlFor="commissionPercentage"
            errors={issues}
          >
            <Input name="commissionPercentage" type="number" step="0.01" />
          </FormField>
        </div>
      </FormSection>

      <FormSection title="Imagem do Produto">
        <FormField label="Upload da Imagem" htmlFor="image" errors={issues}>
          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormField>
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Pré-visualização:</p>
            <Image
              src={imagePreview}
              alt="Pré-visualização da imagem"
              width={128}
              height={128}
              className="rounded-md object-cover"
            />
          </div>
        )}
      </FormSection>

      {generalErrorMessage && (
        <p className="text-sm text-red-500 mt-4">{generalErrorMessage}</p>
      )}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}
