import { ListActionsProps, InfoList, Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Lead",
  textButton: "Editar",
  sections: [
    {
      id: 1,
      title: "Dados Pessoais",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "training_course",
              required: true,
              type: "text",
              label: "Formação",
              messageError: "Must be 2 or more characters long",
            },
          ],
        },
        {
          id: 2,
          fields: [
            {
              id: "name",
              required: true,
              type: "text",
              label: "Nome",
            },
            {
              id: "email",
              required: true,
              type: "text",
              label: "E-mail",
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: "document",
              required: true,
              type: "text",
              label: "Documento",
            },
            {
              id: "whatsapp",
              required: true,
              type: "text",
              label: "Whatsapp",
            },
            {
              id: "status",
              required: true,
              type: "text",
              label: "Situação",
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: "indicator_id",
              required: true,
              type: "select",
              label: "Indicador",
              options: [
                {
                  value: 2,
                  label: "Argério Queiroz",
                },
                {
                  value: 3,
                  label: "Damiles Arruda",
                },
              ],
            },
            {
              id: "consultant",
              required: true,
              type: "select",
              label: "Consultor",
              options: [],
            },
            {
              id: "created_at",
              required: true,
              type: "date",
              label: "Cadastrado em",
            },
          ],
        },
      ],
    },
  ],
};

export const templateformTimeLine: Templateform = {
  title: "Linha do Tempo",
  textButton: "Cadastrar",
  sections: [
    {
      id: 1,
      title: "Registro de status",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "course_id",
              required: true,
              type: "text",
              label: "Curso",
              messageError: "Must be 2 or more characters long",
            },
          ],
        },
        {
          id: 2,
          fields: [
            {
              id: "title",
              required: true,
              type: "text",
              label: "Nome",
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: "describe",
              required: true,
              type: "text",
              label: "Descrição",
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: "status",
              required: true,
              type: "select",
              label: "Status",
              options: [
                {
                  value: 2,
                  label: "Interessado",
                },
                {
                  value: 3,
                  label: "Sem interesse",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const templateformSearch: Templateform = {
  title: "Search",
  textButton: "",
  sections: [
    {
      id: 1,
      title: "Search",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "search",
              label: "Search",
              required: true,
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};

export const infoList: InfoList = {
  itemsHeader: ["N", "NOME / WHATSAPP", "CURSO", "INDICADOR", "STATUS"],
  itemsList: [
    "name",
    "whatsapp",
    "training_course",
    "indicator.name",
    "status",
  ],
};
