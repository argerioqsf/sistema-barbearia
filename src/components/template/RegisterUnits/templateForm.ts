import { Course, Profile, TemplateForm, Unit } from '@/types/general'

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

export const templateSegmentsForm: TemplateForm<Profile> = {
  title: '',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 2,
      title: 'Segmentos',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'id',
              required: true,
              type: 'selectSearch',
              label: '',
              optionKeyLabel:'cpf',
              optionKeyValue:'id',
              options: [
                {id:'23423',phone: '34234',cpf:'323423asdasd4', genre:'32424',birthday:'3432432',pix:'34234234',role:'indicator',userId:'324324242'},
                {id:'23442',phone: '34234',cpf:'323423dd4', genre:'32424',birthday:'3432432',pix:'34234234',role:'indicator',userId:'324324242'},
                {id:'234f2',phone: '34234',cpf:'3234234434', genre:'32424',birthday:'3432432',pix:'34234234',role:'indicator',userId:'324324242'}
              ]
            }
          ],
        },
      ],
    },
  ],
}

export const templateCoursesForm: TemplateForm<Course> = {
  title: '',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 2,
      title: 'Cursos',
      boxes: [
        {
          id: 1,
          fields: [
            {
              id: 'id',
              required: true,
              type: 'selectSearch',
              label: '',
              optionKeyLabel:'name',
              optionKeyValue:'id',
              options: [
                {id: '3432423sd', quant_leads:2, status:'asda', name: 'curso 1'},
                {id: '34324d23', quant_leads:2, status:'asda', name: 'curso 2'},
                {id: '3432442323', quant_leads:2, status:'asda', name: 'curso 3'}
              ]
            },
          ],
        },
      ],
    },
  ],
}
