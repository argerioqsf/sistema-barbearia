'use server'

import { formSchemaCreateTimeLine } from '@/components/template/DetailLeads/schema'
import { api } from '@/data/api'
import { Errors, InitialState, TimeLine } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function registerTimeLine(
  id: string,
  prevState: InitialState<TimeLine>,
  formData: FormData,
): Promise<InitialState<TimeLine>> {
  const validatedFields = formSchemaCreateTimeLine.safeParse({
    id,
    title: 'title',
    description: formData.get('description'),
    status: formData.get('status'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/create/timeline/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          title: 'title',
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
      revalidateTag('timelines')
      revalidateTag(id)
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
    const error = validatedFields.error.flatten()
      .fieldErrors as Errors<TimeLine>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
