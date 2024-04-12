'use server'

import { formSchemaCreateTimeLine } from '@/components/template/DetailLeads/schema'
import { api } from '@/data/api'
import { Errors, InitialState } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function registerTimeLine(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  const validatedFields = formSchemaCreateTimeLine.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    leadsId: formData.get('lead.id'),
    courseId: formData.get('courseId'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/time_line`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          title: formData.get('title'),
          description: formData.get('description'),
          status: formData.get('status'),
          leadsId: formData.get('lead.id'),
          courseId: formData.get('courseId'),
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Failed to Login' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
