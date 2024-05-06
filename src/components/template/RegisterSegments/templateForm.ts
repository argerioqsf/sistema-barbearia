import { Course, Segment, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Segment | Course> = {
  title: 'Cadastrar Segmento',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Dados Pessoais',
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
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                list: [],
              },
            },
          ],
        },
      ],
    },
  ],
}
