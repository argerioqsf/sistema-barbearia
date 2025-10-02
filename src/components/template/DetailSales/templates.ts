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
                  { value: 'CREDIT_CARD', label: 'Cartão de credito' },
                  { value: 'DEBIT_CARD', label: 'Cartão de debito' },
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
