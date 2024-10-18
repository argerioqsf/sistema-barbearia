import { Course, Segment, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Segment | Course> = {
  title: 'Segmento',
  textButton: 'Editar',
  sections: [
    {
      id: 1,
      title: 'Dados do Segmento',
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
