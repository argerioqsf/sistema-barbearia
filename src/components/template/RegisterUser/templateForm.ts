import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Cadastrar Usuário",
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
              label: "Nome",
            },
            {
              id: "pix",
              required: true,
              type: "text",
              label: "Chave Pix",
            },
          ],
        },
        // {
        //   id: 2,
        //   fields: [
        //     {
        //       id: "image",
        //       required: true,
        //       type: "file",
        //       label: "Foto: (600 x 600)",
        //       classInput: "pl-2",
        //     },
        //   ],
        // },
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
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: "birthday",
              required: true,
              type: "text",
              label: "Nascimento",
            },
            {
              id: "genre",
              required: true,
              type: "select",
              label: "Genero",
              options: [
                {
                  label: "Selecioinar",
                  value: "",
                },
                {
                  label: "Masculino",
                  value: 'man',
                },
                {
                  label: "Feminino",
                  value: 'woman',
                },
                {
                  label: "Outro",
                  value: 'other',
                },
              ],
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
            }
          ],
        },
        {
          id: 6,
          fields: [
            {
              id: "active",
              required: true,
              type: "select",
              label: "Ativo",
              options: [
                {
                  label: "Selecionar",
                  value: "",
                },
                {
                  label: "Sim",
                  value: 'sim',
                },
                {
                  label: "Não",
                  value: 'nao',
                },
              ],
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
              id: "role",
              required: true,
              type: "select",
              label: "Permissão",
              messageError: "Must be 2 or more characters long",
              options: [],
            },
          ],
        },
      ],
    },
  ],
};
