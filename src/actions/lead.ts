'use server'

import { formSchemaUpdateLead } from '@/components/template/DetailLeads/schema'
import { formSchemaRegisterLead } from '@/components/template/RegisterLeads/schema'
import { formSchemaRegisterLeadPublic } from '@/components/template/RegisterLeadsPublic/schema'
import { api } from '@/data/api'
import {
  Errors,
  InitialState,
  Lead,
  ReturnGet,
  ReturnList,
  Unit,
  User,
} from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function registerLead(
  prevState: InitialState<User | Lead | Unit>,
  formData: FormData,
): Promise<InitialState<User | Lead>> {
  const validatedFields = formSchemaRegisterLead.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    document: formData.get('document'),
    email: formData.get('email'),
    city: formData.get('city'),
    indicatorId: formData.get('indicatorId'),
    consultantId: formData.get('consultantId'),
    unitId: formData.get('unitId'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        document: formData.get('document'),
        email: formData.get('email'),
        city: formData.get('city'),
        indicatorId: formData.get('indicatorId'),
        consultantId: formData.get('consultantId'),
        unitId: formData.get('unitId'),
      }
      const response = await api(`/create/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify(data),
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

export async function registerLeadPublic(
  id: string,
  prevState: InitialState<Lead>,
  formData: FormData,
): Promise<InitialState<Lead>> {
  console.log('formData: ', formData)
  const validatedFields = formSchemaRegisterLeadPublic.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    document: formData.get('document'),
    email: formData.get('email'),
    city: formData.get('city'),
    segmentId: formData.get('segmentId'),
    unitId: formData.get('unitId'),
  })

  if (validatedFields.success) {
    try {
      const response = await api(`/create/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          document: formData.get('document'),
          email: formData.get('email'),
          city: formData.get('city'),
          segmentId: formData.get('segmentId'),
          unitId: formData.get('unitId'),
          indicatorId: id ?? '',
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

export async function updateLead(
  id: string,
  prevState: InitialState<Lead | User | Unit>,
  formData: FormData,
): Promise<InitialState<Lead | User>> {
  const validatedFields = formSchemaUpdateLead.safeParse({
    id,
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
      const response = await api(`/lead/${id}`, {
        method: 'PUT',
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

export async function getLead(id: string): Promise<ReturnGet<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['leads'], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const lead = await response.json()
    return { response: lead }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function arquivarLead(id?: string): Promise<InitialState<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/archived/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        archived: true,
      }),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('leads')
    return { ok: true }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function desarquivarLead(
  id?: string,
): Promise<InitialState<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/archived/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        archived: false,
      }),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('leads')
    return { ok: true }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function listLeads(
  q?: string,
  page?: string,
  indicatorId?: string,
  consultantId?: string,
): Promise<ReturnList<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/leads',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['leads'], revalidate: 60 * 4 },
      },
      page,
      q,
      indicatorId,
      consultantId,
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { leads, count } = await response.json()
    return { response: leads, count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function listLeadsArquived(
  q?: string,
  page?: string,
  indicatorId?: string,
  consultantId?: string,
): Promise<ReturnList<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/leads/archived',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['leads'], revalidate: 60 * 4 },
      },
      page,
      q,
      indicatorId,
      consultantId,
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { leads, count } = await response.json()
    return { response: leads, count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
