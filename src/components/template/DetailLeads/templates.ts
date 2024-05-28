import {
  InfoList,
  Lead,
  TemplateForm,
  TimeLine,
  Unit,
  User,
} from '@/types/general'

export const templateForm: TemplateForm<Lead | User | Unit> = {
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
      id: 4,
      title: 'Unidade',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'unitId',
              required: true,
              type: 'selectSearch',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: 'Curso',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'courseId',
              required: true,
              type: 'selectSearch',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: 'Seguimento',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'segmentId',
              required: true,
              type: 'selectSearch',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
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
                    value: '',
                    label: 'Selecione',
                  },
                  {
                    value: 'Interessado',
                    label: 'Interessado',
                  },
                  {
                    value: 'Sem interesse',
                    label: 'Sem interesse',
                  },
                ],
              },
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
      ],
    },
  ],
}

export const infoList: InfoList<Lead> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR'],
  itemsList: ['name', 'phone', '', 'indicator.user.name', ''],
}
