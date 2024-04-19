import { InfoList, TemplateForm, Unit } from '@/types/general'

export const templateForm: TemplateForm<Unit> = {
  title: 'Unidade',
  textButton: 'Editar',
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
      id: 2,
      title: 'Seguimentos',
      boxes: [
        {
          id: 2,
          fields: [
            {
              id: 'segments',
              required: true,
              type: 'selectSearch',
              label: '',
              option: {
                keyLabel: 'name',
                keyValue: 'id',
                list: [],
              },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Cursos',
      boxes: [
        {
          id: 3,
          fields: [
            {
              id: 'courses',
              required: true,
              type: 'selectSearch',
              label: '',
              option: { keyLabel: 'name', keyValue: 'id', list: [] },
            },
          ],
        },
      ],
    },
  ],
}

const infoListSegments: InfoList<Unit> = {
  itemsHeader: ['N', 'Nome', ''],
  itemsList: ['name', '', '', '', ''],
  title: 'Segmentos',
  listActions: [
    {
      id: 1,
      icon: 'Edit',
      href: 'dashboard/segments/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/segments/detail/',
      name: 'Vizualizar',
    },
  ],
}

const infoListCourses: InfoList<Unit> = {
  itemsHeader: ['N', 'Nome', ''],
  itemsList: ['name', '', '', '', ''],
  title: 'Cursos',
  listActions: [
    {
      id: 1,
      icon: 'Edit',
      href: 'dashboard/courses/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/courses/detail/',
      name: 'Vizualizar',
    },
  ],
}

export const templates = {
  templateForm,
  infoListSegments,
  infoListCourses,
}
