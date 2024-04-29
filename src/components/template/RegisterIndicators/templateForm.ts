import { Profile, TemplateForm, User } from '@/types/general'

export const templateForm: TemplateForm<User | Profile> = {
  title: 'Cadastrar Indicador',
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
              label: 'Chave pix',
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
          id: 5,
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
