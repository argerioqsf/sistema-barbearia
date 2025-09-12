import { TemplateForm } from '@/types/general'
import type { ZDebt } from '@/features/debts/schemas'

export const templateForm: TemplateForm<ZDebt> = {
  title: 'Criar Débito',
  textButton: 'Criar',
  sections: [
    {
      id: 1,
      title: 'Dados do Débito',
      boxes: [
        {
          id: 1,
          fields: [
            { id: 'value', required: true, type: 'number', label: 'Valor' },
            { id: 'planId', required: true, type: 'text', label: 'Plano' },
            {
              id: 'planProfileId',
              required: true,
              type: 'text',
              label: 'Assinatura',
            },
            {
              id: 'paymentDate',
              required: false,
              type: 'date',
              label: 'Data de pagamento',
            },
          ],
        },
      ],
    },
  ],
}
