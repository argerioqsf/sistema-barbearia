import { mockServer } from '@/components/config/mockServer'
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
  ],
}

const infoListSegments: InfoList<Unit> = {
  itemsHeader: ['N', 'Nome', ''],
  itemsList: ['name', '', '', '', ''],
  listActions: mockServer.listActionsSegments,
  title: 'Segmentos',
}

const infoListCourses: InfoList<Unit> = {
  itemsHeader: ['N', 'Nome', ''],
  itemsList: ['name', '', '', '', ''],
  listActions: mockServer.listActionsCourses,
  title: 'Cursos',
}

export const templates = {
  templateForm,
  infoListSegments,
  infoListCourses,
}
