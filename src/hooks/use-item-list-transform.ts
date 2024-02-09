import {
  IndicatorsHookType,
  IndicatorsType,
  ItemListHookType,
  ItemListType,
  UserHookType,
  UserType,
} from "@/types/general";

type LimitFields<T> = [T, T, T, T];

export const useUserListTransform = (
  list: Array<UserType | any>,
  fields: LimitFields<UserHookType | "">
): Array<ItemListType> => {
  const listTransform = list.map((item) => {
    let new_item: ItemListType = {
      id: 0,
      info1: "",
      info2: "",
      info3: "",
      info4: "",
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
            [key]: item[fields[i]],
          };
        }
      } else {
        count++;
      }
    }
    return new_item;
  });

  return listTransform;
};

export const useIndicatorsListTransform = (
  list: Array<IndicatorsType | any>,
  fields: LimitFields<IndicatorsHookType | "">
): Array<ItemListType> => {
  const listTransform = list.map((item) => {
    let new_item: ItemListType = {
      id: 0,
      info1: "",
      info2: "",
      info3: "",
      info4: "",
    };
    let props: Array<any> = Object.keys(item) as Array<IndicatorsHookType>;
    let count = 0;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] != "") {
        if (props.includes(fields[i])) {
          count++;
          let key: ItemListHookType = ("info" + count) as ItemListHookType;

          new_item = {
            ...new_item,
            [key]: item[fields[i]],
          };
        }
      } else {
        count++;
      }
    }
    return new_item;
  });

  return listTransform;
};
