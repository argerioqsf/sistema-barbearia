import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
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
              id: 'status',
              required: true,
              type: 'select',
              label: 'Status',
              options: [
                {
                  value: 1,
                  label: 'Ativo',
                },
                {
                  value: 2,
                  label: 'Suspenso',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
