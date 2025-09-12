import { TemplateForm } from '@/types/general'
import type { ZProduct } from '@/features/products/schemas'

export const templateForm: TemplateForm<ZProduct | { image: string }> = {
  title: 'Cadastrar Produtos',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações do Produto',
      cols: 3,
      boxes: [
        {
          id: 1,
          cols: 2,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Nome',
              cols: 2,
            },
            {
              id: 'price',
              required: true,
              type: 'number',
              label: 'Preço',
            },
            {
              id: 'active',
              required: true,
              type: 'select',
              label: 'Ativo',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'true', label: 'Sim' },
                  { value: 'false', label: 'Não' },
                ],
              },
            },
          ],
        },
        {
          id: 3,
          row: 2,
          fields: [
            {
              id: 'image',
              required: true,
              type: 'file',
              label: 'Image',
              row: 2,
              cols: 2,
            },
          ],
        },
      ],
    },
  ],
}
