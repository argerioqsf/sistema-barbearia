import { TemplateForm } from '@/types/general'
import type { ZBarber } from '@/features/barbers/schemas'

export const templateForm: TemplateForm<ZBarber> = {
  title: 'Cadastrar Barbeiro',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Dados do Barbeiro',
      cols: 3,
      boxes: [
        {
          id: 1,
          cols: 3,
          fields: [
            { id: 'name', required: true, type: 'text', label: 'Nome' },
            { id: 'email', required: true, type: 'text', label: 'Email' },
            {
              id: 'password',
              required: true,
              type: 'password',
              label: 'Senha',
            },
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
            { id: 'roleId', required: true, type: 'text', label: 'Papel' },
          ],
        },
      ],
    },
  ],
}
