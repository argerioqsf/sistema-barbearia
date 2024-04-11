import { formSchemaUpdateIndicator } from '@/components/template/DetailIndicators/schema'
import { formSchemaUpdateUnit } from '@/components/template/DetailUnits/schema'
import { formSchemaUpdateUserProfile } from '@/components/template/DetailUsers/schema'
import { formSchemaEditProfile } from '@/components/template/Profile/schema'
import { SchemaForm } from '@/types/general'
import { z } from 'zod'

export const SchemaDefault = z.object({
  default: z.string().min(1, { message: 'Schema Default' }),
})

export const useHandleSchema = () => {
  function getSchema(icon: string): SchemaForm {
    switch (icon) {
      case 'UpdateUnit':
        return formSchemaUpdateUnit
      case 'EditProfile':
        return formSchemaEditProfile
      case 'UpdateIndicator':
        return formSchemaUpdateIndicator
      case 'UpdateUserProfile':
        return formSchemaUpdateUserProfile
      default:
        return SchemaDefault
    }
  }
  return { getSchema }
}
