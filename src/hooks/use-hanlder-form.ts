import { GetDefaultValues, Models, SchemaForm } from '@/types/general'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

export function useHandlerForm<T extends FieldValues>(
  // schema?: SchemaForm<T> = new z.ZodObject(new z.ZodAny()),
  functionRequest?: GetDefaultValues<T>,
  defaultValues?: DefaultValues<T>,
){
  // type SchemaDefault = z.infer<typeof schema>

  function requestDefault() {
    return {}
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<T>({
    defaultValues: defaultValues??undefined,
    // resolver: zodResolver(schema),
  })

  return { register, handleSubmit, errors, setValue }
}
