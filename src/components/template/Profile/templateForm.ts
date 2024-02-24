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
              value: "Argério",
            },
            {
              id: "last_name",
              required: true,
              type: "text",
              label: "Sobrenome",
              messageError: "Must be 2 or more characters long",
              value: "Queiroz",
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
              value: "96984109393",
            },
            {
              id: "documento",
              required: true,
              type: "text",
              label: "Documento",
              value: "022939393948",
            },
            {
              id: "key_pix",
              required: true,
              type: "text",
              label: "Chave pix",
              value: "96984109393",
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
              value: "argerio@gmail.com",
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
              value: "Santana-AP",
            },
            {
              id: "status",
              required: true,
              type: "text",
              label: "Status",
              value: "ativo",
            },
            {
              id: "user_at",
              required: true,
              type: "date",
              label: "Data",
              value: "2012-12-12",
            },
          ],
        },
      ],
    },
  ],
};
