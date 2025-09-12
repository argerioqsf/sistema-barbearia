import { TemplateForm } from '@/types/general'
import type { ZAppointment } from '@/features/appointments/schemas'

export const templateForm: TemplateForm<ZAppointment> = {
  title: 'Cadastrar Agendamento',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações do Agendamento',
      cols: 3,
      boxes: [
        {
          id: 1,
          cols: 3,
          fields: [
            { id: 'clientId', required: true, type: 'text', label: 'Cliente' },
            { id: 'barberId', required: true, type: 'text', label: 'Barbeiro' },
            { id: 'date', required: true, type: 'date', label: 'Data' },
            {
              id: 'serviceIds',
              required: true,
              type: 'text',
              label: 'Serviços (IDs)',
            },
          ],
        },
      ],
    },
  ],
}
