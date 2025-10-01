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
            {
              id: 'description',
              required: true,
              type: 'text',
              label: 'Descrição',
            },
            { id: 'price', required: true, type: 'number', label: 'Preço' },
            { id: 'cost', required: true, type: 'number', label: 'Custo' },
            {
              id: 'commissionPercentage',
              required: true,
              type: 'number',
              label: 'Percentual de comissão',
            },
            {
              id: 'defaultTime',
              required: false,
              type: 'number',
              label: 'Duração padrão (min)',
            },
          ],
        },
      ],
    },
  ],
}
