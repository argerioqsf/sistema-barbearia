import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Cadastrar Indicador",
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
              id: "name",
              required: true,
              type: "text",
              label: "Nome test",
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
          id: 2,
          fields: [
            {
              id: "image",
              required: true,
              type: "file",
              label: "Foto: (600 x 600)",
              classInput: "pl-2",
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
              id: "documento",
              required: true,
              type: "text",
              label: "Documento",
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: "datebirth",
              required: true,
              type: "text",
              label: "Nascimento",
            },
            {
              id: "genero",
              required: true,
              type: "text",
              label: "Genero",
            },
          ],
        },
        {
          id: 5,
          fields: [
            {
              id: "email",
              required: true,
              type: "text",
              label: "E-mail",
            },
            {
              id: "password",
              required: true,
              type: "password",
              label: "Senha",
            },
          ],
        },
        {
          id: 6,
          fields: [
            {
              id: "nivel",
              required: true,
              type: "text",
              label: "Nivel",
            },
            {
              id: "status",
              required: true,
              type: "text",
              label: "Status",
            },
            {
              id: "date",
              required: true,
              type: "text",
              label: "Data",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Permissões",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "permission",
              required: true,
              type: "text",
              label: "Permissão",
              messageError: "Must be 2 or more characters long",
            },
          ],
        },
      ],
    },
  ],
};
