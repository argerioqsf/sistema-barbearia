'use server'

import { formSchemaRegisterFile } from '@/components/template/RegisterFiles/schema'
import { api } from '@/data/api'
import { Errors, FileCustom, InitialState, ReturnList } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function getFiles(): Promise<ReturnList<FileCustom>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/uploads',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['FileCustoms'], revalidate: 60 * 4 },
      },
      '1',
      {},
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const files = await response.json()
    return { response: files }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function registerFile(
  prevState: InitialState<{ avatar: string }>,
  formData: FormData,
): Promise<InitialState<{ avatar: string }>> {
  const validatedFields = formSchemaRegisterFile.safeParse({
    avatar: formData.get('avatar'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: formData,
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('files')
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Failed to register file' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors<{
      avatar: string
    }>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function deleteFile(
  id?: string,
): Promise<InitialState<FileCustom>> {
  try {
    if (!id) return { errors: { request: 'Id undefined' } }
    const token = getTokenFromCookieServer()
    const response = await api(`/uploads/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('files')
    return {
      ok: true,
    }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}
