import { InfoList, Lead, TemplateForm, TimeLine } from '@/types/general'

export const templateForm: TemplateForm<Lead> = {
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
              options: [
                {
                  value: '2',
                  label: 'Argério Queiroz',
                },
                {
                  value: '3',
                  label: 'Damiles Arruda',
                },
              ],
            },
            {
              id: 'consultantId',
              required: true,
              type: 'select',
              label: 'Consultor',
              optionKeyLabel: 'name',
              optionKeyValue: 'id',
              options: [],
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
            {
              id: 'id',
              required: true,
              type: 'hidden',
              label: '',
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: 'describe',
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
              optionKeyLabel: 'label',
              optionKeyValue: 'value',
              options: [
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
              optionKeyLabel: 'label',
              optionKeyValue: 'value',
              options: [
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
