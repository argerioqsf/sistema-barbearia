import type { TemplateForm } from '@/types/general'
import type { ZDebt } from '@/features/debts/schemas'

export const templateUpdate: TemplateForm<ZDebt> = {
  title: 'Atualizar Débito',
  textButton: 'Salvar',
  sections: [
    {
      id: 1,
      title: 'Dados',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'paymentDate',
              required: false,
              type: 'date',
              label: 'Data de pagamento',
            },
            {
              id: 'status',
              required: false,
              type: 'select',
              label: 'Status',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'PENDING', label: 'Pendente' },
                  { value: 'PAID', label: 'Pago' },
                  { value: 'CANCELED', label: 'Cancelado' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}

export const templatePay: TemplateForm<ZDebt> = {
  title: 'Pagar Débito',
  textButton: 'Pagar',
  sections: [
    {
      id: 1,
      title: 'Pagamento',
      boxes: [
        {
          id: 1,
          fields: [
            { id: 'amount', required: true, type: 'number', label: 'Valor' },
          ],
        },
      ],
    },
  ],
}
