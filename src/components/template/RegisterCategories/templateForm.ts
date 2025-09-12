import { TemplateForm } from '@/types/general'
import type { ZCategory } from '@/features/categories/schemas'

export const templateForm: TemplateForm<ZCategory> = {
  title: 'Cadastrar Categoria',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações da Categoria',
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
