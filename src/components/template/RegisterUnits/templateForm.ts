import { Course, Segment, TemplateForm, Unit } from '@/types/general'

export const templateForm: TemplateForm<Unit | Course | Segment> = {
  title: 'Cadastrar Unidade',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações da Unidade',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Nome da Unidade',
            },
          ],
        },
      ],
    },
    {
      id: 1,
      title: 'Seguimentos',
      boxes: [
        {
          id: 2,
          fields: [
            {
              id: 'segments',
              required: true,
              type: 'selectSearch',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Cursos',
      boxes: [
        {
          id: 3,
          fields: [
            {
              id: 'courses',
              required: true,
              type: 'selectSearch',
              label: '',
              option: { keyLabel: 'name', keyValue: 'id', list: [] },
            },
          ],
        },
      ],
    },
  ],
}
