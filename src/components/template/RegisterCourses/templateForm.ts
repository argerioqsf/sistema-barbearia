import { Course, Segment, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Course | Segment> = {
  title: 'Cadastrar Curso',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações do Curso',
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
        {
          id: 2,
          fields: [
            {
              id: 'active',
              required: true,
              type: 'select',
              label: 'Ativo',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: '',
                    label: 'Selecione',
                  },
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
