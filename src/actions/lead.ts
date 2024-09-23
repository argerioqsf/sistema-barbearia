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
    courseId: formData.get('courseId'),
    segmentId: formData.get('segmentId'),
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
        courseId: formData.get('courseId'),
        segmentId: formData.get('segmentId'),
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
  const validatedFields = formSchemaRegisterLeadPublic.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    document: formData.get('document'),
    email: formData.get('email'),
    city: formData.get('city'),
    unitId: formData.get('unitId'),
    courseId: formData.get('courseId'),
    segmentId: formData.get('segmentId'),
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
          unitId: formData.get('unitId'),
          indicatorId: id ?? '',
          courseId: formData.get('courseId'),
          segmentId: formData.get('segmentId'),
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
    consultantId: formData.get('consultantId'),
    unitId: formData.get('unitId'),
    courseId: formData.get('courseId'),
    segmentId: formData.get('segmentId'),
    released: formData.get('released'),
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
          consultantId: formData.get('consultantId'),
          unitId: formData.get('unitId'),
          courseId: formData.get('courseId'),
          segmentId: formData.get('segmentId'),
          released: formData.get('released') === 'true',
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('leads')
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
      next: { tags: [id], revalidate: 60 * 4 },
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

export async function pegarLead(id?: string): Promise<InitialState<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/consultant/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
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

export async function matriculationConfirmed(
  id?: string,
): Promise<InitialState<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        matriculation: true,
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

export async function documentsConfirmed(
  id?: string,
): Promise<InitialState<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        documents: true,
      }),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('leads')
    revalidateTag('users')
    return { ok: true }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function createCycle(id?: string): Promise<InitialState<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/create/cycle/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('leads')
    revalidateTag('users')
    return { ok: true }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function endCycle(id?: string): Promise<InitialState<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/update/cycle/${id}/end_cycle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('leads')
    revalidateTag('users')
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
  page?: string,
  where?: Partial<Lead>,
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
      where,
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
