'use server'

import { formSchemaUpdateUser } from '@/components/template/DetailUsers/schema'
import { formSchemaResetPassword } from '@/components/template/ResetPassword/schema'
import { api } from '@/data/api'
import {
  Errors,
  InitialState,
  Profile,
  ReturnRequest,
  Unit,
  User,
} from '@/types/general'
import { revalidateTag } from 'next/cache'
import {
  createCollaborator,
  fetchUser,
  fetchUsersAll,
  fetchUsersPaginated,
  updateCollaboratorStatus,
  updateUser,
} from '@/features/users/api'
import type { QueryParams, ReturnListPaginated } from '@/types/http'
import {
  UserRegisterBody,
  UserUpdateBody,
  ZUser,
} from '@/features/users/schemas'
import { handleRequestError } from '@/shared/errors/handlerRequestError'
import { getBackendToken } from '@/utils/authServer'
import { logger } from '@/shared/logger'
import { ItemData } from '@/components/organisms/Form/FormItemAssociation'

export async function getUser(id: string): Promise<ReturnRequest<ZUser>> {
  try {
    const data = await fetchUser(id)
    return { ok: true, data }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function listUsersPaginatedAction(
  page: string,
  where?: QueryParams<ZUser>,
): Promise<ReturnRequest<ReturnListPaginated<ZUser>>> {
  try {
    const data = await fetchUsersPaginated(page, {
      withCount: true,
      perPage: 10,
      ...where,
    })
    return { ok: true, data }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function listUsersAllAction(): Promise<ReturnRequest<ZUser[]>> {
  try {
    const data = await fetchUsersAll()
    return { ok: true, data }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

function mapperServicesUser(
  services: ItemData[],
): UserRegisterBody['services'] {
  return services.map((service) => ({
    serviceId: service.id,
    commissionPercentage: service.commissionPercentage,
    commissionType: service.commissionType,
    time: service.time,
  }))
}

function mapperProductsUser(
  products: ItemData[],
): UserRegisterBody['products'] {
  return products.map((product) => ({
    productId: product.id,
    commissionPercentage: product.commissionPercentage,
    commissionType: product.commissionType,
    time: product.time,
  }))
}

export async function createUserAction(
  prevState: InitialState<ZUser>,
  formData: FormData,
): Promise<ReturnRequest<ZUser>> {
  try {
    const products = formData.get('products')
      ? JSON.parse(formData.get('products') as string)
      : undefined
    const services = formData.get('services')
      ? JSON.parse(formData.get('services') as string)
      : undefined
    const rawData: UserRegisterBody = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      roleId: formData.get('roleId') as string,
      phone: (formData.get('phone') as string) || undefined,
      cpf: (formData.get('cpf') as string) || undefined,
      birthday: (formData.get('birthday') as string) || undefined,
      genre: (formData.get('genre') as string) || undefined,
      pix: (formData.get('pix') as string) || undefined,
      commissionPercentage: formData.get('commissionPercentage')
        ? Number(formData.get('commissionPercentage'))
        : undefined,
      permissions: formData.get('permissions')
        ? JSON.parse(formData.get('permissions') as string)
        : undefined,
      services: mapperServicesUser(services),
      products: mapperProductsUser(products),
    }

    logger.debug({ rawData }, 'rawData')
    logger.debug({ products: rawData.products }, 'products')
    const data = await createCollaborator(rawData)
    revalidateTag('users')
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateUserAction(
  userId: string,
  prevState: InitialState<ZUser>,
  formData: FormData,
): Promise<ReturnRequest<ZUser>> {
  try {
    const products = formData.get('products')
      ? JSON.parse(formData.get('products') as string)
      : undefined
    const services = formData.get('services')
      ? JSON.parse(formData.get('services') as string)
      : undefined
    const removeServiceIds = formData.get('removeServiceIds')
      ? JSON.parse(formData.get('removeServiceIds') as string)
      : undefined
    const removeProductIds = formData.get('removeProductIds')
      ? JSON.parse(formData.get('removeProductIds') as string)
      : undefined
    const commissionPercentage = Number(formData.get('commissionPercentage'))

    logger.debug({ commissionPercentage }, 'commissionPercentage')

    const rawData: UserUpdateBody = {
      name: formData.get('name') as string,
      roleId: formData.get('roleId') as string,
      phone: (formData.get('phone') as string) || undefined,
      cpf: (formData.get('cpf') as string) || undefined,
      birthday: (formData.get('birthday') as string) || undefined,
      genre: (formData.get('genre') as string) || undefined,
      pix: (formData.get('pix') as string) || undefined,
      commissionPercentage: commissionPercentage ?? undefined,
      permissions: formData.get('permissions')
        ? JSON.parse(formData.get('permissions') as string)
        : undefined,
      services: services ? mapperServicesUser(services) : undefined,
      products: products ? mapperProductsUser(products) : undefined,
      removeServiceIds,
      removeProductIds,
    }

    logger.debug({ rawData }, 'rawData updateUserAction')
    logger.debug(
      { services: rawData.services },
      'rawData.services updateUserAction',
    )
    logger.debug(
      { services: rawData.products },
      'rawData.products updateUserAction',
    )
    const data = await updateUser(userId, rawData)
    revalidateTag('users')
    revalidateTag(userId)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateUserProfile(
  id: string,
  prevState: InitialState<Profile | User | Unit>,
  formData: FormData,
): Promise<InitialState<Profile | User>> {
  const role = formData.get('profile.role')
  const units = JSON.parse(String(formData.get('profile.units')) ?? '[]')
  const validatedFields = formSchemaUpdateUser.safeParse({
    id,
    name: formData.get('name'),
    email: formData.get('email'),
    'profile.active': formData.get('active'),
    'profile.phone': formData.get('profile.phone'),
    'profile.cpf': formData.get('profile.cpf'),
    'profile.genre': formData.get('profile.genre'),
    'profile.birthday': formData.get('profile.birthday'),
    'profile.pix': formData.get('profile.pix'),
    'profile.role': formData.get('profile.role'),
    'profile.city': formData.get('profile.city'),
    'profile.units': units,
  })

  if (validatedFields.success) {
    try {
      const token = await getBackendToken()

      if (!token) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        active: formData.get('active') === 'true',
        phone: formData.get('profile.phone'),
        cpf: formData.get('profile.cpf'),
        genre: formData.get('profile.genre'),
        birthday: formData.get('profile.birthday'),
        pix: formData.get('profile.pix'),
        role,
        city: formData.get('profile.city'),
        unitsIds: units,
      }
      const response = await api(`/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag(id)
      if (role === 'indicator') {
        revalidateTag('indicators')
      } else if (role === 'consultant') {
        revalidateTag('consultants')
      } else {
        revalidateTag('users')
      }

      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Failed to update User' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors<
      Profile & User
    >
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function resetPasswordUser(
  prevState: InitialState<Profile | User | Unit>,
  formData: FormData,
): Promise<InitialState<User>> {
  const validatedFields = formSchemaResetPassword.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (validatedFields.success) {
    try {
      const token = await getBackendToken()
      if (!token) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
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
        errors: { request: 'Failed Reset Password' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors<User>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

// Indicador

export async function confirmPayment(
  id?: string,
): Promise<InitialState<Profile>> {
  try {
    const token = await getBackendToken()
    const response = await api(`/profile/confirm_payment/${id}`, {
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
    revalidateTag('indicators')
    revalidateTag('consultants')
    revalidateTag('users')
    return { ok: true }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function activeUserEmail(
  id?: string,
): Promise<InitialState<User>> {
  try {
    const token = await getBackendToken()
    const response = await api(`/indicator/active/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        active: true,
        sendEmail: true,
      }),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('indicators')
    revalidateTag('users')
    return { ok: true } as InitialState<User>
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}
// TODO: veirifcar no backend se ele esta respeitando a logica de usuario desativado,
// nao deixando usuarios desativados executarem nem uma açao no backend e invalidar o seu token
export async function toggleCollaboratorStatusAction(
  userId: string,
  currentStatus: boolean,
): Promise<ReturnRequest<ZUser>> {
  try {
    const data = await updateCollaboratorStatus(userId, !currentStatus)
    revalidateTag('users')
    return { ok: true, data }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}
