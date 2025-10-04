'use server'

import { formSchemaRegisterFile } from '@/components/template/RegisterFiles/schema'
import { api } from '@/data/api'
import { Errors, FileCustom, InitialState, ReturnList } from '@/types/general'
import { revalidateTag } from 'next/cache'
import { fetchFiles } from '@/features/files/api'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'
import { getBackendToken } from '@/utils/authServer'

export async function getFiles(): Promise<ReturnList<FileCustom>> {
  try {
    const files = await fetchFiles()
    return { response: files as unknown as FileCustom[] }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
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
      const token = await getBackendToken()
      if (!token) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
    const token = await getBackendToken()
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
