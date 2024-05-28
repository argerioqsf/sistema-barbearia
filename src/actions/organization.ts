'use server'

import { formSchemaUpdateOrganization } from '@/components/template/ProfileDetail/schema'
import { api } from '@/data/api'
import { Errors, InitialState, Organization } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function updateOrganization(
  id: string,
  prevState: InitialState<Organization>,
  formData: FormData,
): Promise<InitialState<Organization>> {
  const validatedFields = formSchemaUpdateOrganization.safeParse({
    id,
    name: formData.get('name'),
    slug: formData.get('slug'),
    consultant_bonus: formData.get('consultant_bonus'),
    indicator_bonus: formData.get('indicator_bonus'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`organization/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          slug: formData.get('slug'),
          consultant_bonus: Number(formData.get('consultant_bonus')),
          indicator_bonus: Number(formData.get('indicator_bonus')),
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('organizations')
      revalidateTag(id)
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Failed to update login' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten()
      .fieldErrors as Errors<Organization>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
