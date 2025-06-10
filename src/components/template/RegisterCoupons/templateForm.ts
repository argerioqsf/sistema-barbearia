import { Course, InfoList, Segment, TemplateForm, User } from '@/types/general'

export const templateForm: TemplateForm<Course | Segment | { image: string }> = {
  title: 'Cadastrar Cupons',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações do Cupon',
      cols: 3,
      boxes: [
        {
          id: 1,
          cols: 3,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Código',
              cols: 3,
            },
            {
              id: 'active',
              required: true,
              type: 'select',
              label: 'Tipo de desconto',
              cols: 3,
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: 'porcent',
                    label: 'porcentagem',
                  },
                  {
                    value: 'value',
                    label: 'Valor',
                  },
                ],
              },
            },
            {
              id: 'name',
              required: true,
              type: 'text',
              displayLogic: {
                fieldId: 'active',
                expectedValue: 'porcent'
              },
              label: 'Porcentagem do desconto',
              cols: 3,
            },
            {
              id: 'name',
              required: true,
              type: 'text',
              displayLogic: {
                fieldId: 'active',
                expectedValue: 'value'
              },
              label: 'Valor do desconto',
              cols: 3,
            },
          ],
        },
      ],
    },
  ],
}