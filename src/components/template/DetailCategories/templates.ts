import type { TemplateForm } from '@/types/general'
import type { ZCategory as Category } from '@/features/categories/schemas'

export const templateForm: TemplateForm<Category> = {
  title: 'Categoria',
  textButton: 'Salvar',
  sections: [
    {
      id: 1,
      title: 'Informações da categoria',
      boxes: [
        {
          id: 1,
          fields: [
            { id: 'name', required: true, type: 'text', label: 'Nome' },
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
