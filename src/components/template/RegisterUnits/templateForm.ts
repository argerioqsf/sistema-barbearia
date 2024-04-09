import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
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
      id: 2,
      title: 'Segmentos',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'segments',
              required: true,
              type: 'select',
              label: 'Segmentos',
              options: [
                {
                  label: 'segmento 1',
                  value: 1,
                },
              ],
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
          id: 1,
          fields: [
            {
              id: 'courses',
              required: true,
              type: 'select',
              label: 'Cursos',
              options: [
                {
                  label: 'curso 1',
                  value: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
