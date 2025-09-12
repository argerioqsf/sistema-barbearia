import type { TemplateForm } from '@/types/general'
import type { ZBarber } from '@/features/barbers/schemas'

export const templateForm: TemplateForm<ZBarber> = {
  title: 'Barbeiro',
  textButton: 'Salvar',
  sections: [
    {
      id: 1,
      title: 'Dados',
      boxes: [
        {
          id: 1,
          fields: [
            { id: 'name', required: false, type: 'text', label: 'Nome' },
            { id: 'phone', required: false, type: 'text', label: 'Telefone' },
            { id: 'cpf', required: false, type: 'text', label: 'CPF' },
            { id: 'genre', required: false, type: 'text', label: 'Gênero' },
            {
              id: 'birthday',
              required: false,
              type: 'date',
              label: 'Nascimento',
            },
            { id: 'pix', required: false, type: 'text', label: 'PIX' },
            { id: 'unitId', required: false, type: 'text', label: 'Unidade' },
            { id: 'roleId', required: false, type: 'text', label: 'Papel' },
            {
              id: 'active',
              required: false,
              type: 'select',
              label: 'Ativo',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'true', label: 'Sim' },
                  { value: 'false', label: 'Não' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
