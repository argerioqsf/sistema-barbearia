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
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: "phone",
              required: true,
              type: "text",
              label: "Whatsapp",
            },
            {
              id: "cpf",
              required: true,
              type: "text",
              label: "Documento",
            },
            {
              id: "pix",
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
              label: "E-mail 2",
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
              id: "active",
              required: true,
              type: "select",
              label: "Status",
              options: [
                {
                  value: "",
                  label: "Selecione",
                },
                {
                  value: 0,
                  label: "ativo",
                },
                {
                  value: 1,
                  label: "desativo",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
