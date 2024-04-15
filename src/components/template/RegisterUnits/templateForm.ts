import { Course, Segment, TemplateForm, TimeLine, Unit } from '@/types/general'

export const templateForm: TemplateForm<Unit | Course | Segment | TimeLine> = {
  title: 'Cadastrar Unidade',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações da Unidade',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'name',
              required: true,
              type: 'text',
              label: 'Nome da Unidade',
            },
          ],
        },
      ],
    },
    {
      id: 1,
      title: 'Seguimentos',
      boxes: [
        {
          id: 2,
          fields: [
            {
              id: 'segments',
              required: true,
              type: 'selectSearch',
              label: 'Seguimentos',
              optionKeyLabel: 'name',
              optionKeyValue: 'id',
              options: [
                {
                  id: '0ec2efaf-50d4-404b-aa67-2b737ecb249f',
                  name: 'seguimento 1',
                  created_at: '2342423',
                },
                {
                  id: 'seguimento 2',
                  name: 'seguimento 2',
                  created_at: '2342423',
                },
                {
                  id: 'seguimento 3',
                  name: 'seguimento 3',
                  created_at: '2342423',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      title: 'Cursos',
      boxes: [
        {
          id: 3,
          fields: [
            {
              id: 'courses',
              required: true,
              type: 'selectSearch',
              label: 'Cursos',
              optionKeyLabel: 'name',
              optionKeyValue: 'id',
              options: [
                {
                  id: 'curso 1',
                  quant_leads: 2,
                  active: true,
                  name: 'curso 1',
                },
                {
                  id: 'curso 2',
                  quant_leads: 2,
                  active: true,
                  name: 'curso 2',
                },
                {
                  id: 'curso 3',
                  quant_leads: 2,
                  active: true,
                  name: 'curso 3',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
