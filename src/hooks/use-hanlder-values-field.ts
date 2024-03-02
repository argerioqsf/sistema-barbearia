import { FieldsTemplateForm, Templateform } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useHanlderValuesField= (schemaList: Array<any>) => {

  function handlerDefaultValuesFieldFromData(
    template: Templateform,
    data: any
  ): Templateform {
    let defaultValues = {};
    for (let i = 0; i < template.sections.length; i++) {
      for (let j = 0; j < template.sections[i].boxs.length; j++) {
        for (let k = 0; k < template.sections[i].boxs[j].fields.length; k++) {
          const field = template.sections[i].boxs[j].fields[k];
          const key = field?.id;
          template.sections[i].boxs[j].fields[k].value = data[key] ?? "";
          defaultValues = {
            ...defaultValues,
            // [key]:
          };
        }
      }
    }

    return template;
  }

  return { handlerDefaultValuesFieldFromData };
};
