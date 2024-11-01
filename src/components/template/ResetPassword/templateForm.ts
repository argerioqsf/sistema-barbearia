import { Profile, TemplateForm, Unit, User } from '@/types/general'

export const templateForm: TemplateForm<User | Profile | Unit> = {
  title: 'Resetar Senha',
  textButton: 'Confirmar',
  sections: [
    {
      id: 1,
      title: 'Informações da conta',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'email',
              required: true,
              type: 'text',
              label: 'Email',
            },
            {
              id: 'password',
              required: true,
              type: 'password',
              label: 'Nova Senha',
            },
          ],
        },
      ],
    },
  ],
}
