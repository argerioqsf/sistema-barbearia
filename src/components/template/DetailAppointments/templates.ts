import type { TemplateForm } from '@/types/general'
import type { ZAppointment } from '@/features/appointments/schemas'

export const templateForm: TemplateForm<ZAppointment> = {
  title: 'Agendamento',
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
              id: 'status',
              required: true,
              type: 'select',
              label: 'Status',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'PENDING', label: 'Pendente' },
                  { value: 'APPROVED', label: 'Aprovado' },
                  { value: 'FINISHED', label: 'Finalizado' },
                  { value: 'CANCELED', label: 'Cancelado' },
                ],
              },
            },
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
