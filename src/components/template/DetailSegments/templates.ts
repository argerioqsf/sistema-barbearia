import { Segment, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Segment> = {
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
  ],
}
