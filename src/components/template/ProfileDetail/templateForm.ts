import { Organization, Profile, TemplateForm, User } from '@/types/general'

export const templateForm: TemplateForm<Profile | User> = {
  title: 'Perfil',
  textButton: 'Editar Perfil',
  sections: [
    {
      id: 1,
      title: 'Dados Pessoais',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'user.name',
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
              id: 'phone',
              required: true,
              type: 'text',
              label: 'Whatsapp',
            },
            {
              id: 'cpf',
              required: true,
              type: 'text',
              label: 'Documento',
            },
            {
              id: 'pix',
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
              id: 'birthday',
              required: true,
              type: 'date',
              label: 'Nascimento',
            },
            {
              id: 'genre',
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
          id: 4,
          fields: [
            {
              id: 'user.email',
              required: true,
              type: 'text',
              label: 'E-mail 2',
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
          id: 5,
          fields: [
            {
              id: 'user.active',
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
                    value: 'true',
                    label: 'ativo',
                  },
                  {
                    value: 'false',
                    label: 'desativado',
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

export const templateFormOrganization: TemplateForm<Organization> = {
  title: 'Organização',
  textButton: 'Editar Organização',
  sections: [
    {
      id: 1,
      title: 'Dados da Organização',
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
              id: 'slugs',
              required: true,
              type: 'text',
              label: 'Nome único de identificação',
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: 'consultant_bonus',
              required: true,
              type: 'number',
              label: 'Bônus do Cosultor',
            },
            {
              id: 'indicator_bonus',
              required: true,
              type: 'number',
              label: 'Bônus do Indicador',
            },
          ],
        },
      ],
    },
  ],
}
