import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<{
  startHour?: string
  endHour?: string
}> = {
  title: 'Adicionar bloqueio',
  textButton: 'Adicionar',
  sections: [
    {
      id: 1,
      title: 'Informações',
      boxes: [
        {
          id: 1,
          fields: [
            { id: 'startHour', required: true, type: 'date', label: 'Início' },
            { id: 'endHour', required: true, type: 'date', label: 'Fim' },
          ],
        },
      ],
    },
  ],
}
