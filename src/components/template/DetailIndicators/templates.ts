import { OrderItemsHeaderList, Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Indicador",
  textButton: "",
  sections: [
    {
      id: 1,
      title: "Dados do Indicador",
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
              disabled: true,
            },
            {
              id: "last_name",
              required: true,
              type: "text",
              label: "Sobrenome",
              messageError: "Must be 2 or more characters long",
              disabled: true,
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
              disabled: true,
            },
            {
              id: "document",
              required: true,
              type: "text",
              label: "Documento",
              disabled: true,
            },
            {
              id: "key_pix",
              required: true,
              type: "text",
              label: "Chave pix",
              disabled: true,
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
              disabled: true,
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
              disabled: true,
            },
            {
              id: "status",
              required: true,
              type: "text",
              label: "Status",
              disabled: true,
            },
            {
              id: "user_at",
              required: true,
              type: "date",
              label: "Data",
              disabled: true,
            },
          ],
        },
      ],
    },
  ],
};

export const templateformSearch: Templateform = {
  title: "Search",
  textButton: "",
  sections: [{
    id:1,
    title:'Search',
    boxs:[
      {
        id:1,
        fields:[
          {
            id:'search',
            label:'Search',
            required: true,
            type:'text',
          }
        ]
      }
    ]
  }]
};

export const orderItemsHeaderList: OrderItemsHeaderList = {
  itemsHeader: ["N", "NOME / WHATSAPP", "CURSO", "INDICADOR", "STATUS"],
  itemsList: [
    "name",
    "whatsapp",
    "training_course",
    "indicator.name",
    "status",
  ],
};
