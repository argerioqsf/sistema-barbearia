import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { FileSchema } from './schemas'

export async function fetchFiles() {
  const token = await getBackendToken()
  const response = await api(
    '/uploads',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['files'], revalidate: 60 * 4 },
    },
    '1',
    {},
  )

  if (!response.ok) throw new Error((await response.json()).message)
  const json = await response.json()
  // Accept array of files or wrapped
  const arr = Array.isArray(json)
    ? json
    : Array.isArray(json.files)
      ? json.files
      : []
  const parsed = arr.map((f: unknown) => FileSchema.parse(f))
  return parsed
}
