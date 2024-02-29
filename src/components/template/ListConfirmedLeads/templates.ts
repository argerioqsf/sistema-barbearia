import { OrderItemsHeaderList, Templateform } from "@/types/general";

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
