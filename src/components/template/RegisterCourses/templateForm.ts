import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Cadastrar Curso",
  textButton: "Cadastrar",
  sections: [
    {
      id: 1,
      title: "Informações do Curso",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "name",
              required: true,
              type: "text",
              label: "Nome",
              messageError: "Deve ter 2 ou mais caracteres",
            },
          ],
        },
      ],
    },
  ],
};
