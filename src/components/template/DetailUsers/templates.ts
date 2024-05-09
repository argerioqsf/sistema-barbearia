import { Profile, TemplateForm, User } from '@/types/general'

export const templateForm: TemplateForm<User | Profile> = {
  title: 'Usuário',
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
              label: 'Chave Pix',
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
                    label: 'Selecioinar',
                    value: '',
                  },
                  {
                    label: 'Masculino',
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
    {
      id: 2,
      title: 'Permissões',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'profile.role',
              required: true,
              type: 'select',
              label: 'Permissão',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [],
              },
            },
          ],
        },
      ],
    },
  ],
}
