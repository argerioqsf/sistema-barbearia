import { InfoList, Lead, TemplateForm, TimeLine, User } from '@/types/general'

export const templateForm: TemplateForm<Lead | User> = {
  title: 'Lead',
  textButton: 'Editar',
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
            {
              id: 'email',
              required: true,
              type: 'text',
              label: 'E-mail',
            },
            {
              id: 'city',
              required: true,
              type: 'text',
              label: 'Cidade',
            },
          ],
        },
        {
          id: 1,
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
      ],
    },
    {
      id: 2,
      title: 'indicador',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'indicatorId',
              required: true,
              type: 'selectSearch',
              label: '',
              disabled: true,
              option: {
                keyLabel: 'name',
                keyValue: 'profile.id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Consultor',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'consultantId',
              required: true,
              type: 'selectSearch',
              label: '',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
  ],
}

export const templateFormTimeLine: TemplateForm<TimeLine> = {
  title: 'Linha do Tempo',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Registro de status',
      boxes: [
        {
          id: 2,
          fields: [
            {
              id: 'title',
              required: true,
              type: 'text',
              label: 'Nome',
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: 'description',
              required: true,
              type: 'text',
              label: 'Descrição',
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: 'status',
              required: true,
              type: 'select',
              label: 'Status',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: '2',
                    label: 'Interessado',
                  },
                  {
                    value: '3',
                    label: 'Sem interesse',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 1,
          fields: [
            {
              id: 'course_id',
              required: true,
              type: 'select',
              label: 'Curso',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: '2',
                    label: 'curso 1',
                  },
                  {
                    value: '3',
                    label: 'curso 2',
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

export const infoList: InfoList<Lead> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR'],
  itemsList: ['name', 'phone', '', 'indicator.user.name', ''],
}
