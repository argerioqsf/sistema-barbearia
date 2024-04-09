import { InfoList, TemplateForm } from '@/types/general'

const templateForm: TemplateForm = {
  title: 'Indicador',
  textButton: '',
  sections: [
    {
      id: 1,
      title: 'Dados do Indicador',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Nome',
              disabled: true,
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: 'phone',
              required: true,
              type: 'text',
              label: 'Whatsapp',
              disabled: true,
            },
            {
              id: 'cpf',
              required: true,
              type: 'text',
              label: 'Documento',
              disabled: true,
            },
            {
              id: 'pix',
              required: true,
              type: 'text',
              label: 'Chave pix',
              disabled: true,
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: 'email',
              required: true,
              type: 'text',
              label: 'E-mail',
              disabled: true,
            },
          ],
        },
        {
          id: 5,
          fields: [
            {
              id: 'status',
              required: true,
              type: 'text',
              label: 'Status',
              disabled: true,
            },
            {
              id: 'created_at',
              required: true,
              type: 'date',
              label: 'Data',
              disabled: true,
            },
          ],
        },
      ],
    },
  ],
}

const templateFormSearch: TemplateForm = {
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

const infoList: InfoList = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR', 'STATUS'],
  itemsList: ['name', 'phone', '', 'indicator.name', 'status'],
  listActions: [
    {
      id: 1,
      onclick: () => {},
      icon: 'Edit',
      href: 'indicators/edit',
      name: 'Editar',
    },
    {
      id: 2,
      onclick: () => {},
      icon: 'Eye',
      href: 'dashboard/leads/',
      name: 'Vizualizar',
    },
    {
      id: 3,
      onclick: () => {},
      icon: 'Lock',
      href: 'home',
      name: 'Desativar',
    },
    {
      id: 4,
      onclick: () => {},
      icon: 'Link',
      href: 'home',
      name: 'Link',
    },
  ],
  title: 'Leads',
}

export const templates = {
  templateForm,
  templateFormSearch,
  infoList,
}
