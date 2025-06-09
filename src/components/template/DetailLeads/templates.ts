import {
  InfoList,
  Lead,
  TemplateForm,
  TimeLine,
  Unit,
  User,
} from '@/types/general'
import status_time_line from '@/constants/status_time_line.json'
import shift from '@/constants/shift.json'
import modalities from '@/constants/modalities.json'
import education from '@/constants/education.json'
import personalityTraits from '@/constants/personalityTraits.json'

export const templateForm: TemplateForm<Lead | User | Unit> = {
  title: 'Lead',
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
              roleVisible: 'lead.form.name',
            },
            {
              id: 'email',
              required: true,
              type: 'text',
              label: 'E-mail',
              roleVisible: 'lead.form.email',
            },
            {
              id: 'city',
              required: true,
              type: 'text',
              label: 'Cidade',
              roleVisible: 'lead.form.city',
            },
          ],
        },
        {
          id: 2,
          fields: [
            {
              id: 'document',
              required: true,
              type: 'text',
              label: 'Documento',
              roleVisible: 'lead.form.document',
            },
            {
              id: 'phone',
              required: true,
              type: 'text',
              label: 'Whatsapp',
              roleVisible: 'lead.form.phone',
            },
            {
              id: 'released',
              required: true,
              type: 'select',
              label: 'Pronto',
              disabled: true,
              roleDisable: 'lead.form.released',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: '',
                    label: 'Selecione',
                  },
                  {
                    value: 'true',
                    label: 'Sim',
                  },
                  {
                    value: 'false',
                    label: 'Não',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: 'shift',
              required: true,
              type: 'select',
              label: 'Turno',
              roleVisible: 'lead.form.shift',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: undefined,
                    label: 'Selecione',
                  },
                  ...Object.keys(shift).map((item) => {
                    return {
                      value: item,
                      label: item,
                    }
                  }),
                ],
              },
            },
            {
              id: 'course_modality',
              required: true,
              type: 'select',
              label: 'Modalidade de curso',
              roleVisible: 'lead.form.course_modality',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: undefined,
                    label: 'Selecione',
                  },
                  ...Object.keys(modalities).map((item) => {
                    return {
                      value: item,
                      label: item,
                    }
                  }),
                ],
              },
            },
            {
              id: 'class',
              required: true,
              type: 'text',
              label: 'Turma',
              roleVisible: 'lead.form.class',
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: 'education',
              required: true,
              type: 'select',
              label: 'Escolaridade',
              roleVisible: 'lead.form.education',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: undefined,
                    label: 'Selecione',
                  },
                  ...Object.keys(education).map((item) => {
                    return {
                      value: item,
                      label: item,
                    }
                  }),
                ],
              },
            },
            {
              id: 'personalityTraits',
              required: true,
              type: 'select',
              label: 'Traços de personaliade',
              roleVisible: 'lead.form.personalityTraits',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  {
                    value: undefined,
                    label: 'Selecione',
                  },
                  ...Object.keys(personalityTraits).map((item) => {
                    return {
                      value: item,
                      label: item,
                    }
                  }),
                ],
              },
            },
            {
              id: 'birthday',
              required: true,
              type: 'date',
              label: 'Aniversário',
              roleVisible: 'lead.form.birthday',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'indicador',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'indicatorId',
              required: true,
              type: 'selectSearch',
              label: '',
              roleDisable: 'lead.form.indicator',
              option: {
                keyLabel: 'name',
                keyValue: 'profile.id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Consultor',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'consultantId',
              required: true,
              type: 'selectSearch',
              label: '',
              disabled: true,
              roleDisable: 'lead.form.consultant',
              option: {
                keyLabel: 'name',
                keyValue: 'profile.id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: 'Unidade',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'unitId',
              required: true,
              type: 'selectSearch',
              roleDisable: 'lead.form.unit',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: 'Curso',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'courseId',
              required: true,
              type: 'selectSearch',
              roleDisable: 'lead.form.course',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: 'Segmento',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'segmentId',
              required: true,
              type: 'selectSearch',
              roleDisable: 'lead.form.segment',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                variant: 'single',
                list: [],
              },
            },
          ],
        },
      ],
    },
  ],
}

export const templateFormTimeLine: TemplateForm<TimeLine> = {
  title: 'Linha do Tempo',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Registro de status',
      boxes: [
        {
          id: 4,
          fields: [
            {
              id: 'status',
              required: true,
              type: 'select',
              label: 'Status',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: status_time_line,
              },
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: 'description',
              required: true,
              type: 'text',
              label: 'Descrição',
            },
          ],
        },
      ],
    },
  ],
}

export const infoList: InfoList<Lead> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR'],
  itemsList: ['name', 'phone', '', 'indicator.user.name', ''],
}
