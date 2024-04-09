import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
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
              options: [
                {
                  value: '',
                  label: 'Selecioine',
                },
                {
                  value: 1,
                  label: 'Sim',
                },
                {
                  value: 0,
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
