import { Profile, TemplateForm, User } from '@/types/general'

export const templateForm: TemplateForm<User | Profile> = {
  title: 'Cadastrar Usuário',
  textButton: 'Cadastrar',
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
              id: 'pix',
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
              id: 'phone',
              required: true,
              type: 'text',
              label: 'Whatsapp',
            },
          ],
        },
        {
          id: 33,
          fields: [
            {
              id: 'cpf',
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
              id: 'email',
              required: true,
              type: 'text',
              label: 'E-mail',
            },
            {
              id: 'password',
              required: true,
              type: 'password',
              label: 'Senha',
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
              id: 'role',
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
        {
          id: 2,
          fields: [
            {
              id: 'units',
              required: true,
              type: 'selectSearch',
              label: 'Unidades',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                variant: 'multiple',
                list: [],
              },
              displayLogic: {
                fieldId: 'role',
                expectedValue: 'consultant',
              },
            },
          ],
        },
      ],
    },
  ],
}
