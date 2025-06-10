import { Course, InfoList, Segment, TemplateForm, User } from '@/types/general'

export const templateForm: TemplateForm<Course | Segment | { image: string }> = {
  title: 'Cadastrar Produtos',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações do Produto',
      cols: 3,
      boxes: [
        {
          id: 1,
          cols: 2,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Nome',
              cols: 2,
            },
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Descrição',
              cols: 2,
            },
            {
              id: 'name',
              required: true,
              type: 'number',
              label: 'Valor de custo',
            },
            {
              id: 'name',
              required: true,
              type: 'number',
              label: 'Valor de venda',
            },
          ],
        },
        {
          id: 3,
          row: 2,
          fields: [
            {
              id: 'image',
              required: true,
              type: 'file',
              label: 'Image',
              row: 2,
              cols:2
            },
          ],
        },
        {
          id: 3,
          cols: 2,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'teste',
            },
          ],
        },
      ],
    },
  ],
}