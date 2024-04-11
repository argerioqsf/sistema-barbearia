import {
  Course,
  Lead,
  ListAction,
  Segment,
  TimeLine,
  Unit,
  User,
} from '@/types/general'

export type MockServer = {
  indicators: User[]
  leads: Lead[]
  users: User[]
  segments: Segment[]
  unidades: Unit[]
  cursos: Course[]
  time_line: TimeLine[]
  listActionsIndicators: ListAction[]
  listActionsUsers: ListAction[]
  listActionsLeads: ListAction[]
  listActionsNewLeads: ListAction[]
  listActionsConfirmedLeads: ListAction[]
  listActionsWaitingConfirmationLeads: ListAction[]
  listActionsUnits: ListAction[]
  listActionsCourses: ListAction[]
  listActionsSegments: ListAction[]
}

export const mockServer: MockServer = {
  indicators: [
    {
      id: '1',
      name: 'Argério',
      email: 'teste@gmail.com',
      active: 'status',
      profile: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
        leadsIndicator: [
          {
            id: '1',
            name: 'Argério Queiroz',
            document: '94482749384',
            email: 'teste@toNestErrors.com',
            city: 'Macapá',
            phone: '234234234',
            indicatorId: '3442434',
            indicator: {
              id: 'wqe1e231',
              phone: '234234234',
              cpf: '234234234',
              genre: 'masculino',
              birthday: '234234324',
              pix: '332423432',
              role: 'indicator',
              userId: '21312343',
              leadsIndicator: [],
            },
            timeline: [
              {
                id: '1',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '2',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '3',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
            ],
          },
          {
            id: '2',
            name: 'Argério Queiroz',
            document: '94482749384',
            email: 'teste@toNestErrors.com',
            city: 'Macapá',
            phone: '234234234',
            indicatorId: '3442434',
            indicator: {
              id: 'wqe1e231',
              phone: '234234234',
              cpf: '234234234',
              genre: 'masculino',
              birthday: '234234324',
              pix: '332423432',
              role: 'indicator',
              userId: '21312343',
              leadsIndicator: [],
            },
            timeline: [
              {
                id: '1',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '2',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '3',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
            ],
          },
        ],
      },
      created_at: '34242342',
    },
    {
      id: '2',
      name: 'Argério',
      email: 'teste@gmail.com',
      active: 'status',
      profile: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
        leadsIndicator: [
          {
            id: '1',
            name: 'Argério Queiroz',
            document: '94482749384',
            email: 'teste@toNestErrors.com',
            city: 'Macapá',
            phone: '234234234',
            indicatorId: '3442434',
            indicator: {
              id: 'wqe1e231',
              phone: '234234234',
              cpf: '234234234',
              genre: 'masculino',
              birthday: '234234324',
              pix: '332423432',
              role: 'indicator',
              userId: '21312343',
              leadsIndicator: [],
            },
            timeline: [
              {
                id: '1',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '2',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '3',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
            ],
          },
          {
            id: '2',
            name: 'Argério Queiroz',
            document: '94482749384',
            email: 'teste@toNestErrors.com',
            city: 'Macapá',
            phone: '234234234',
            indicatorId: '3442434',
            indicator: {
              id: 'wqe1e231',
              phone: '234234234',
              cpf: '234234234',
              genre: 'masculino',
              birthday: '234234324',
              pix: '332423432',
              role: 'indicator',
              userId: '21312343',
              leadsIndicator: [],
            },
            timeline: [
              {
                id: '1',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '2',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
              {
                id: '3',
                lead_id: '2',
                course_id: '2',
                title: 'titulo',
                describe:
                  'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
                status: 'Matrícula Confirmada',
                created_at: '2023-05-12',
              },
            ],
          },
        ],
      },
      created_at: '34242342',
    },
  ],
  leads: [
    {
      id: '1',
      name: 'Argério Queiroz',
      document: '94482749384',
      email: 'teste@toNestErrors.com',
      city: 'Macapá',
      phone: '234234234',
      indicatorId: '3442434',
      indicator: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
        leadsIndicator: [],
      },
      timeline: [
        {
          id: '1',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
        {
          id: '2',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
        {
          id: '3',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
      ],
    },
    {
      id: '2',
      name: 'Argério Queiroz',
      document: '94482749384',
      email: 'teste@toNestErrors.com',
      city: 'Macapá',
      phone: '234234234',
      indicatorId: '3442434',
      indicator: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
      },
      timeline: [
        {
          id: '1',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
        {
          id: '2',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
        {
          id: '3',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
      ],
    },
    {
      id: '3',
      name: 'Argério Queiroz',
      document: '94482749384',
      email: 'teste@toNestErrors.com',
      city: 'Macapá',
      phone: '234234234',
      indicatorId: '3442434',
      indicator: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
      },
      timeline: [
        {
          id: '1',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
        {
          id: '2',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
        {
          id: '3',
          lead_id: '2',
          course_id: '2',
          title: 'titulo',
          describe:
            'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
          status: 'Matrícula Confirmada',
          created_at: '2023-05-12',
        },
      ],
    },
  ],
  users: [
    {
      id: '1',
      name: 'Argério',
      email: 'teste@gmail.com',
      active: 'status',
      created_at: '34242342',
      profile: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
      },
    },
    {
      id: '2',
      name: 'Argério',
      email: 'teste@gmail.com',
      active: 'status',
      created_at: '34242342',
      profile: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
      },
    },
    {
      id: '3',
      name: 'Argério',
      email: 'teste@gmail.com',
      active: 'status',
      created_at: '34242342',
      profile: {
        id: 'wqe1e231',
        phone: '234234234',
        cpf: '234234234',
        genre: 'masculino',
        birthday: '234234324',
        pix: '332423432',
        role: 'indicator',
        userId: '21312343',
      },
    },
  ],
  segments: [
    {
      id: '1',
      name: 'EAD',
      created_at: '2012-12-12',
    },
    {
      id: '2',
      name: 'EDUCAÇÃO BÁSICA',
      created_at: '2012-12-12',
    },
    {
      id: '3',
      name: 'GRADUAÇÃO',
      created_at: '2012-12-12',
    },
    {
      id: '4',
      name: 'OUTRAS LOCALIDADES',
      created_at: '2012-12-12',
    },
    {
      id: '5',
      name: 'OUTRAS LOCALIDADES',
      created_at: '2012-12-12',
    },
  ],
  unidades: [
    {
      id: '1',
      name: 'SANTANA',
      created_at: '19/09/2023',
      segments: [
        {
          id: '1',
          name: 'EAD-SANTANA',
          created_at: '19/09/2023',
        },
      ],
      courses: [
        {
          id: '1',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
        {
          id: '2',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
        {
          id: '3',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
        {
          id: '4',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
      ],
    },
    {
      id: '2',
      name: 'SANTANA 2',
      created_at: '19/09/2023',
      segments: [
        {
          id: '1',
          name: 'EAD-SANTANA',
          created_at: '19/09/2023',
        },
        {
          id: '2',
          name: 'EAD-SANTANA 2',
          created_at: '19/09/2023',
        },
      ],
      courses: [
        {
          id: '1',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
        {
          id: '2',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
        {
          id: '3',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
        {
          id: '4',
          name: 'Pedagogia',
          quant_leads: 2,
          status: 1,
        },
      ],
    },
  ],
  cursos: [
    {
      id: '1',
      name: 'Curso 1',
      quant_leads: 2,
      status: 1,
    },
    {
      id: '2',
      name: 'Curso 2',
      quant_leads: 2,
      status: 1,
    },
    {
      id: '3',
      name: 'Curso 3',
      quant_leads: 4,
      status: 1,
    },
    {
      id: '4',
      name: 'Curso 4',
      quant_leads: 3,
      status: 1,
    },
    {
      id: '5',
      name: 'Curso 5',
      quant_leads: 6,
      status: 1,
    },
  ],
  time_line: [
    {
      id: '1',
      lead_id: '2',
      course_id: '2',
      title: 'titulo',
      describe:
        'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
      status: 'Matrícula Confirmada',
      created_at: '2023-05-12',
    },
    {
      id: '2',
      lead_id: '2',
      course_id: '2',
      title: 'titulo',
      describe:
        'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
      status: 'Matrícula Confirmada',
      created_at: '2023-05-12',
    },
    {
      id: '3',
      lead_id: '2',
      course_id: '2',
      title: 'titulo',
      describe:
        'se cadastrou por curiosidade, não pode pagar um curso com o valor das nossas mensalidades e foi irredutível nas quebras de objeções',
      status: 'Matrícula Confirmada',
      created_at: '2023-05-12',
    },
  ],
  // permissoes
  // situacao
  listActionsIndicators: [
    {
      id: 1,
      icon: 'Edit',
      href: 'indicators/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/indicators/detail/',
      name: 'Vizualizar',
    },
    {
      id: 3,
      icon: 'Lock',
      href: 'home',
      name: 'Desativar',
    },
    {
      id: 4,
      icon: 'Link',
      href: 'home',
      name: 'Link',
    },
  ],
  listActionsUsers: [
    {
      id: 1,
      icon: 'Edit',
      href: 'users/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/users/detail/',
      name: 'Vizualizar',
    },
    {
      id: 3,
      icon: 'Lock',
      href: 'home',
      name: 'Desativar',
    },
  ],
  listActionsLeads: [
    {
      id: 1,
      icon: 'Edit',
      href: 'leads/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/leads/detail/',
      name: 'Vizualizar',
    },
  ],
  listActionsNewLeads: [
    {
      id: 1,
      icon: 'HandPointLeft',
      href: 'leads/edit',
      name: 'Pegar',
    },
  ],
  listActionsConfirmedLeads: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/leads/',
      name: 'Visualizar',
    },
  ],
  listActionsWaitingConfirmationLeads: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/leads/',
      name: 'Visualizar',
    },
    {
      id: 1,
      icon: 'Edit',
      href: 'leads/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Link',
      href: 'leads/confirmed',
      name: 'Confirmar matrícula',
    },
  ],
  listActionsUnits: [
    {
      id: 1,
      icon: 'Edit',
      href: 'users/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/units/detail/',
      name: 'Vizualizar',
    },
  ],
  listActionsCourses: [
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
  listActionsSegments: [
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
