'use server'

import { formSchemaUpdateLead } from '@/components/template/DetailLeads/schema'
import { formSchemaRegisterLead } from '@/components/template/RegisterLeads/schema'
import { api } from '@/data/api'
import { Errors, InitialState, Lead } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function registerLead(
  prevState: InitialState<Lead>,
  formData: FormData,
): Promise<InitialState<Lead>> {
  const validatedFields = formSchemaRegisterLead.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    document: formData.get('document'),
    email: formData.get('email'),
    city: formData.get('city'),
    indicatorId: formData.get('indicatorId'),
    consultantId: formData.get('consultantId'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/create/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          document: formData.get('document'),
          email: formData.get('email'),
          city: formData.get('city'),
          indicatorId: formData.get('indicatorId'),
          consultantId: formData.get('consultantId'),
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<Lead>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
export async function updateLead(
  prevState: InitialState<Lead>,
  formData: FormData,
): Promise<InitialState<Lead>> {
  const validatedFields = formSchemaUpdateLead.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    document: formData.get('document'),
    email: formData.get('email'),
    city: formData.get('city'),
    indicatorId: formData.get('indicatorId'),
    consultantId: formData.get('consultantId'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const idLead = formData.get('id')
      const response = await api(`/lead/${idLead}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          document: formData.get('document'),
          email: formData.get('email'),
          city: formData.get('city'),
          indicatorId: formData.get('indicatorId'),
          consultantId: formData.get('consultantId'),
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('leads')
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<Lead>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
