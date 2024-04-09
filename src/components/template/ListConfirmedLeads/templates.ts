import { InfoList, TemplateForm } from '@/types/general'

export const templateFormSearch: TemplateForm = {
  title: 'Search',
  textButton: '',
  sections: [
    {
      id: 1,
      title: 'Search',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'search',
              label: 'Search',
              required: true,
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export const infoList: InfoList = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR', 'STATUS'],
  itemsList: ['name', 'phone', '', 'indicator.name', 'status'],
}
