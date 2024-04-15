import { Lead, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<Lead> = {
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
              id: 'document',
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
              optionKeyLabel: 'label',
              optionKeyValue: 'value',
              options: [],
            },
            {
              id: 'consultantId',
              required: true,
              type: 'select',
              label: 'Consultor',
              optionKeyLabel: 'label',
              optionKeyValue: 'value',
              options: [],
            },
          ],
        },
      ],
    },
  ],
}
