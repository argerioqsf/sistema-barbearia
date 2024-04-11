import { InfoList, TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
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
              id: 'status',
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
              options: [
                {
                  value: 2,
                  label: 'Argério Queiroz',
                },
                {
                  value: 3,
                  label: 'Damiles Arruda',
                },
              ],
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
            },
          ],
        },
      ],
    },
  ],
}

export const templateFormTimeLine: TemplateForm = {
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
              id: 'lead.id',
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
              options: [
                {
                  value: 2,
                  label: 'Interessado',
                },
                {
                  value: 3,
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
              options: [
                {
                  value: 2,
                  label: 'curso 1',
                },
                {
                  value: 3,
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

export const templateFormSearch: TemplateForm = {
  title: 'Search',
  textButton: '',
  sections: [
    {
      id: 1,
      title: 'Search',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'search',
              label: 'Search',
              required: true,
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export const infoList: InfoList = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR', 'STATUS'],
  itemsList: ['name', 'phone', '', 'indicator.name', 'status'],
}
