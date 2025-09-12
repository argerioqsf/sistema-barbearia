import { TemplateForm } from '@/types/general'
import type { ZSale } from '@/features/sales/schemas'

export const templateForm: TemplateForm<ZSale> = {
  title: 'Nova Venda',
  textButton: 'Criar',
  sections: [
    {
      id: 1,
      title: 'Dados da Venda',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'method',
              required: true,
              type: 'select',
              label: 'Método',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'CASH', label: 'Dinheiro' },
                  { value: 'CARD', label: 'Cartão' },
                  { value: 'PIX', label: 'Pix' },
                ],
              },
            },
            { id: 'clientId', required: false, type: 'text', label: 'Cliente' },
            {
              id: 'observation',
              required: false,
              type: 'text',
              label: 'Observação',
            },
          ],
        },
      ],
    },
  ],
}
