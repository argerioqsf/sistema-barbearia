import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Cadastrar Segmento",
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
              messageError: "Deve ter 2 ou mais caracteres",
            },
          ],
        },
      ],
    },
  ],
};
