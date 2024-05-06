import { Course, Segment, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Segment | Course> = {
  title: 'Seguimento',
  textButton: 'Editar',
  sections: [
    {
      id: 1,
      title: 'Dados do Seguimento',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Nome',
            },
            {
              id: 'id',
              required: true,
              type: 'hidden',
              label: '',
            },
          ],
        },
      ],
    },
    {
      id: 2,
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
