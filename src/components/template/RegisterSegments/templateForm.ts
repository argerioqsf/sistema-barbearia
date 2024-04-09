import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
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
  ],
}
