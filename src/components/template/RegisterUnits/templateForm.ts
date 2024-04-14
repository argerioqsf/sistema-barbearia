import {
  Course,
  FieldsTemplateForm,
  LimitFieldsForm,
  Segment,
  TemplateForm,
  Unit,
} from '@/types/general'

const fieldsSegment: LimitFieldsForm<FieldsTemplateForm<Unit, Segment>> = [
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
]

const fieldsCourse: LimitFieldsForm<FieldsTemplateForm<Unit, Course>> = [
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
        status: 'asda',
        name: 'curso 1',
      },
      {
        id: 'curso 2',
        quant_leads: 2,
        status: 'asda',
        name: 'curso 2',
      },
      {
        id: 'curso 3',
        quant_leads: 2,
        status: 'asda',
        name: 'curso 3',
      },
    ],
  },
]

const fieldsUnit: LimitFieldsForm<FieldsTemplateForm<Unit>> = [
  {
    id: 'name',
    required: true,
    type: 'text',
    label: 'Nome da Unidade',
  },
]

export const templateForm: TemplateForm<Unit> = {
  title: 'Cadastrar Unidade',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações da Unidade',
      boxes: [
        {
          id: 1,
          fields: fieldsUnit,
        },
      ],
    },
    {
      id: 1,
      title: 'Seguimentos',
      boxes: [
        {
          id: 2,
          fields: fieldsSegment,
        },
      ],
    },
    {
      id: 1,
      title: 'Cursos',
      boxes: [
        {
          id: 3,
          fields: fieldsCourse,
        },
      ],
    },
  ],
}
