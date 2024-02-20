import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Cadastrar Leads",
  textButton: "Cadastrar",
  sections: [
    {
      id: 1,
      title: "Dados Pessoais",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "formation",
              required: true,
              type: "text",
              label: "Formação",
              messageError: "Must be 2 or more characters long",
            },
            {
              id: "unit",
              required: true,
              type: "text",
              label: "Unidade",
              messageError: "Must be 2 or more characters long",
            },
            {
              id: "course",
              required: true,
              type: "text",
              label: "Cursos",
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
              id: "situation",
              required: true,
              type: "text",
              label: "Situação",
            },
          ],
        },
        {
          id: 5,
          fields: [
            {
              id: "indicator_id",
              required: true,
              type: "select",
              label: "Indicador",
              options: [],
            },
            {
              id: "consultant",
              required: true,
              type: "select",
              label: "Consultor",
              options: [],
            },
            {
              id: "lead_at",
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
