import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm = {
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
          ],
        },
        {
          id: 2,
          fields: [
            {
              id: 'image',
              required: true,
              type: 'file',
              label: 'Foto: (600 x 600)',
              classInput: 'pl-2',
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
          id: 4,
          fields: [
            {
              id: 'birthday',
              required: true,
              type: 'text',
              label: 'Nascimento',
            },
            {
              id: 'genre',
              required: true,
              type: 'select',
              label: 'Genero',
              options: [
                {
                  label: 'genero 1',
                  value: 1,
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
          ],
        },
        {
          id: 6,
          fields: [
            {
              id: 'status',
              required: true,
              type: 'select',
              label: 'Status',
              options: [
                {
                  label: 'status 1',
                  value: 1,
                },
              ],
            },
            {
              id: 'created_at',
              required: true,
              type: 'date',
              label: 'Data',
            },
          ],
        },
      ],
    },
  ],
}
