import {
  FieldsList,
  IndicatorsHookType,
  IndicatorsType,
  ItemListHookType,
  ItemListType,
  UserHookType,
  UserType,
} from "@/types/general";

export const useItemListTransform = () => {
  const listTransform = (
    list: Array<UserType | any> | undefined,
    fields: FieldsList
  ): Array<ItemListType> => {
    const listTransform = list?.map((item) => {
      let new_item: ItemListType = {
        id: 0,
        info1: "",
        info2: "",
        info3: "",
        info4: "",
        info5: "",
      };
      let props: Array<any> = Object.keys(item) as Array<UserHookType>;
      let count = 0;
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] != "") {
          if (props.includes(fields[i])) {
            count++;
            let key: ItemListHookType = ("info" + count) as ItemListHookType;
            new_item = {
              ...new_item,
              id: item.id,
              ...item,
              [key]: item[fields[i]],
            };
          } else {
            if (fields[i].includes(".")) {
              const fieldObject = fields[i].split(".");
              if (fieldObject.length > 1) {
                count++;
                let key: ItemListHookType = ("info" +
                  count) as ItemListHookType;
                let value = item?.[fieldObject[0]];
                for (let i = 1; i < fieldObject.length; i++) {
                  value = value?.[fieldObject[i]];
                }
                new_item = {
                  ...new_item,
                  id: item.id,
                  ...item,
                  [key]: value,
                };
              }
            }
          }
        } else {
          count++;
        }
      }
      return new_item;
    });
    return listTransform??[];
  };
  return { listTransform };
};
