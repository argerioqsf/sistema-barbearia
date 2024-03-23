import { SectionTemplateForm, FieldsFormSchema } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useHandlerForm = (
  schema: z.ZodObject<any>,
  functionRequest?: () => Promise<any>
) => {
  type Schema = z.infer<typeof schema>;

  function requestdefault() {
    return {};
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: async () =>
      functionRequest ? functionRequest() : requestdefault(),
    resolver: zodResolver(schema),
  });

  return { register, handleSubmit, errors };
};
