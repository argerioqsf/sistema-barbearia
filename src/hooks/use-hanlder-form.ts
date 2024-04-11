import { GetDefaultValues, Models, SchemaForm } from '@/types/general'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useHandlerForm = (
  schema: SchemaForm,
  functionRequest?: GetDefaultValues,
  defaultValues?: Models,
) => {
  type SchemaDefault = z.infer<typeof schema>

  function requestDefault() {
    return {}
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SchemaDefault>({
    defaultValues: async () =>
      functionRequest ? functionRequest() : defaultValues ?? requestDefault(),
    resolver: zodResolver(schema),
  })

  return { register, handleSubmit, errors, setValue }
}
