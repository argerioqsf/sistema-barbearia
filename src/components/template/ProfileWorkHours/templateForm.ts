import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<{
  weekDay?: number
  startHour?: string
  endHour?: string
}> = {
  title: 'Adicionar horário de trabalho',
  textButton: 'Adicionar',
  sections: [
    {
      id: 1,
      title: 'Informações',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'weekDay',
              required: true,
              type: 'select',
              label: 'Dia da semana',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda' },
                  { value: '2', label: 'Terça' },
                  { value: '3', label: 'Quarta' },
                  { value: '4', label: 'Quinta' },
                  { value: '5', label: 'Sexta' },
                  { value: '6', label: 'Sábado' },
                ],
              },
            },
            { id: 'startHour', required: true, type: 'date', label: 'Início' },
            { id: 'endHour', required: true, type: 'date', label: 'Fim' },
          ],
        },
      ],
    },
  ],
}
