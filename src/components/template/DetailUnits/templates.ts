import { mockServer } from "@/components/config/mockServer";
import { ListActionsProps, InfoList, Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Unidade",
  textButton: "Editar",
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
  ],
};

const infoListSegments: InfoList = {
  itemsHeader: ["N", "Nome", ""],
  itemsList: ["name", "", "", "", ""],
  listActions: mockServer.listActionsSegments,
  title: "Segmentos",
};

const infoListCourses: InfoList = {
  itemsHeader: ["N", "Nome", ""],
  itemsList: ["name", "", "", "", ""],
  listActions: mockServer.listActionsCourses,
  title: "Cursos",
};

export const templates = {
  templateform,
  infoListSegments,
  infoListCourses,
};
