import { ListActionsProps, InfoList, Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Seguimento",
  textButton: "Editar",
  sections: [
    {
      id: 1,
      title: "Dados do Segmento",
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
