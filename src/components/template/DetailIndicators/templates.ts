import { InfoList, TemplateForm } from '@/types/general'

const templateForm: TemplateForm = {
  title: 'Indicador',
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
              id: 'profile.phone',
              required: true,
              type: 'text',
              label: 'Whatsapp',
            },
            {
              id: 'profile.cpf',
              required: true,
              type: 'text',
              label: 'Documento',
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: 'profile.birthday',
              required: true,
              type: 'date',
              label: 'Nascimento',
            },
            {
              id: 'profile.genre',
              required: true,
              type: 'select',
              label: 'Genero',
              options: [
                {
                  label: 'Maculino',
                  value: 'man',
                },
                {
                  label: 'Feminino',
                  value: 'woman',
                },
                {
                  label: 'Outro',
                  value: 'other',
                },
              ],
            },
          ],
        },
        {
          id: 5,
          fields: [
            {
              id: 'email',
              required: true,
              type: 'text',
              label: 'E-mail',
            },
            {
              id: 'profile.pix',
              required: true,
              type: 'text',
              label: 'Chave pix',
            },
          ],
        },
        {
          id: 6,
          fields: [
            {
              id: 'active',
              required: true,
              type: 'select',
              label: 'Ativo',
              options: [
                {
                  label: 'Selecionar',
                  value: '',
                },
                {
                  label: 'Sim',
                  value: 'true',
                },
                {
                  label: 'Não',
                  value: 'false',
                },
              ],
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
  infoList,
}
