import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Cadastrar Unidade",
  textButton: "Cadastrar",
  sections: [
    {
      id: 1,
      title: "Informações da Unidade",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "name",
              required: true,
              type: "text",
              label: "Nome da Unidade",
              messageError: "Must be 2 or more characters long",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Segmentos",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "segments",
              required: true,
              type: "select",
              label: "Segmentos",
              options: [
                {
                  label: "segmento 1",
                  value: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Cursos",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "courses",
              required: true,
              type: "select",
              label: "Cursos",
              options: [
                {
                  label: "curso 1",
                  value: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
