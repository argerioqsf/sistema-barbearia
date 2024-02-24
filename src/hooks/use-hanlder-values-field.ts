import { Templateform } from "@/types/general";
import { UseFormSetValue } from "react-hook-form";

export const useHandlerValuesField = () => {
  function setValuesFieldFromData(
    template: Templateform,
    setValue: UseFormSetValue<any>
  ) {
    for (let i = 0; i < template.sections.length; i++) {
      for (let j = 0; j < template.sections[i].boxs.length; j++) {
        for (let k = 0; k < template.sections[i].boxs[j].fields.length; k++) {
          const field = template.sections[i].boxs[j].fields[k];
          field.value && setValue(field?.id, field?.value);
        }
      }
    }
  }

  return { setValuesFieldFromData };
};
