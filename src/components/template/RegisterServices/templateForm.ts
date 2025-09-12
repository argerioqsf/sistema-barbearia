import { TemplateForm } from '@/types/general'
import type { ZService } from '@/features/services/schemas'

export const templateForm: TemplateForm<ZService> = {
  title: 'Cadastrar Serviço',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações do Serviço',
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
            { id: 'price', required: true, type: 'number', label: 'Preço' },
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
