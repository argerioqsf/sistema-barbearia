import { InfoList, Profile, TemplateForm, User } from '@/types/general'

const templateForm: TemplateForm<User | Profile> = {
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
              id: 'profile.pix',
              required: true,
              type: 'text',
              label: 'Chave pix',
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
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
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
              id: 'profile.city',
              required: true,
              type: 'text',
              label: 'Cidade',
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
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
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
            },
          ],
        },
      ],
    },
  ],
}

const infoList: InfoList<User> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR', 'ATIVO'],
  itemsList: ['name', 'profile.phone', '', 'name', 'active'],
  listActions: [
    {
      id: 1,
      icon: 'Edit',
      href: 'indicators/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/leads/',
      name: 'Vizualizar',
    },
    {
      id: 3,
      icon: 'Lock',
      href: 'home',
      name: 'Desativar',
    },
    {
      id: 4,
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
