import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
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
          ],
        },
      ],
    },
  ],
}
