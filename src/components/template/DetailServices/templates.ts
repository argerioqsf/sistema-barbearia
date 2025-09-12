import type { TemplateForm } from '@/types/general'
import type { ZService as Service } from '@/features/services/schemas'

export const templateForm: TemplateForm<Service> = {
  title: 'Serviço',
  textButton: 'Salvar',
  sections: [
    {
      id: 1,
      title: 'Informações do serviço',
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
