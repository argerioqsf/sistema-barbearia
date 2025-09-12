import type { TemplateForm } from '@/types/general'
import type { ZSale } from '@/features/sales/schemas'

export const templateForm: TemplateForm<ZSale> = {
  title: 'Venda',
  textButton: 'Salvar',
  sections: [
    {
      id: 1,
      title: 'Atualizar',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'observation',
              required: false,
              type: 'text',
              label: 'Observação',
            },
            {
              id: 'method',
              required: false,
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
          ],
        },
      ],
    },
  ],
}
