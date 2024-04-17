import { Course, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Course> = {
  title: 'Curso',
  textButton: 'Editar',
  sections: [
    {
      id: 1,
      title: 'Informações do curso',
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
        {
          id: 2,
          fields: [
            {
              id: 'active',
              required: true,
              type: 'select',
              label: 'Status',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: 'true',
                    label: 'Sim',
                  },
                  {
                    value: 'false',
                    label: 'Não',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
