import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Perfil",
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
              id: "name",
              required: true,
              type: "text",
              label: "Nome",
              messageError: "Must be 2 or more characters long",
            },
            {
              id: "last_name",
              required: true,
              type: "text",
              label: "Sobrenome",
              messageError: "Must be 2 or more characters long",
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: "whatsapp",
              required: true,
              type: "text",
              label: "Whatsapp",
            },
            {
              id: "document",
              required: true,
              type: "text",
              label: "Documento",
            },
            {
              id: "key_pix",
              required: true,
              type: "text",
              label: "Chave pix",
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: "email",
              required: true,
              type: "text",
              label: "E-mail",
            },
          ],
        },
        {
          id: 5,
          fields: [
            {
              id: "city",
              required: true,
              type: "text",
              label: "Cidade-UF",
            },
            {
              id: "status",
              required: true,
              type: "select",
              label: "Status",

              options: [
                {
                  value: 1,
                  label: "ativo",
                },
                {
                  value: 2,
                  label: "desativo",
                },
              ],
            },
            {
              id: "user_at",
              required: true,
              type: "date",
              label: "Data",
            },
          ],
        },
      ],
    },
  ],
};
