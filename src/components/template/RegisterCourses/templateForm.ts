import { Course, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Course> = {
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
              optionKeyLabel: 'label',
              optionKeyValue: 'value',
              options: [
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
          ],
        },
      ],
    },
  ],
}
