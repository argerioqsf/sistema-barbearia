import type { TemplateForm } from '@/types/general'
import type { ZProduct as Product } from '@/features/products/schemas'

export const templateForm: TemplateForm<Product> = {
  title: 'Produto',
  textButton: 'Salvar',
  sections: [
    {
      id: 1,
      title: 'Informações do produto',
      boxes: [
        {
          id: 1,
          fields: [
            { id: 'name', required: true, type: 'text', label: 'Nome' },
            { id: 'price', required: false, type: 'number', label: 'Preço' },
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
      ],
    },
  ],
}
