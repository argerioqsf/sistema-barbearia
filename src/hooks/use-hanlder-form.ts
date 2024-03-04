import { SectionTemplateForm, FieldsFormSchema } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useHandlerForm= (sections?: SectionTemplateForm[],functionRequest?: ()=> Promise<any> ) => {

    const MAX_FILE_SIZE = 500000;
    const ACCEPTED_IMAGE_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    let arraySchema:FieldsFormSchema = {}
    if (sections) {
      for (let i = 0; i < sections?.length; i++) {
        const boxs = sections[i].boxs
        for (let j = 0; j < boxs.length; j++) {
          const fields = sections[i].boxs[j].fields
          for (let k = 0; k < fields.length; k++) {
            let validation = {}
            if (fields[k].type === 'text' || fields[k].type === 'password' && fields[k].type === 'date') {
              validation = z.string().min(fields[k].roles?.minCaracters??1, { message: fields[k].messageError??`O campo ${fields[k].label} é requerido` })
            }else if (fields[k].type === 'select') {
              validation = z.number().min(fields[k].roles?.minCaracters??1, { message: fields[k].messageError??`O campo ${fields[k].label} é requerido` })
            }else if (fields[k].type === 'file') {
              validation = z
              .any()
              .refine((files) => files?.length == 1, `O campo ${fields[k].label} é requerido`)
              .refine(
                (files) => files?.[0]?.size <= MAX_FILE_SIZE,
                `O tamanho máximo é de 5MB.`
              )
              .refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                "apenas os tipos .jpg, .jpeg, .png and .webp serão aceitas."
              )
            }else {
              validation = z.string().min(fields[k].roles?.minCaracters??1, { message: fields[k].messageError??`O campo ${fields[k].label} é requerido` })
            }
            arraySchema = {
              ...arraySchema,
              [fields[k].id]: validation
            }
          }
        }
      }
    }

    const schema = z.object(arraySchema);
  
    type Schema = z.infer<typeof schema>;

    function requestdefault() {
      return {}
    }

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Schema>({
      defaultValues: async () => functionRequest ? functionRequest(): requestdefault(),
      resolver: zodResolver(schema),
    });

  return { register, handleSubmit, errors};
};
