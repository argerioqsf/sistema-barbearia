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
