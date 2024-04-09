import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
  title: 'Cadastrar Leads',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Dados Pessoais',
      boxes: [
        {
          id: 2,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Nome',
            },
            {
              id: 'email',
              required: true,
              type: 'text',
              label: 'E-mail',
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: 'cpf',
              required: true,
              type: 'text',
              label: 'Documento',
            },
            {
              id: 'phone',
              required: true,
              type: 'text',
              label: 'Whatsapp',
            },
            {
              id: 'active',
              required: true,
              type: 'text',
              label: 'Situação',
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: 'indicatorId',
              required: true,
              type: 'select',
              label: 'Indicador',
              options: [],
            },
            {
              id: 'consultantId',
              required: true,
              type: 'select',
              label: 'Consultor',
              options: [],
            },
            {
              id: 'created_at',
              required: true,
              type: 'date',
              label: 'Cadastrado em',
              disabled: true,
            },
          ],
        },
      ],
    },
  ],
}
