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
            {
              id: 'description',
              required: true,
              type: 'text',
              label: 'Descrição',
              cols: 2,
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
