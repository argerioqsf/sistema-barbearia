import { TemplateForm } from '@/types/general'

export const templateForm: TemplateForm<{ avatar: string }> = {
  title: 'Cadastrar Imagem',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Selecione a imagem',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'avatar',
              required: true,
              type: 'file',
              label: '',
            },
          ],
        },
      ],
    },
  ],
}
