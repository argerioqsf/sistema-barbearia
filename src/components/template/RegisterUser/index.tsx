import { listSelectUnits } from '@/actions/unit'
import { registerUserProfile } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import roles from '@/constants/roles.json'
import {
  type InitialState,
  OptionGeneric,
  Profile,
  Roles,
  User,
} from '@/types/general'
import { templateForm } from './templateForm'
import ErrorState from '@/components/molecules/ErrorState'
import type { ZUser } from '@/features/users/schemas'

const submitRegisterUser = async (
  prevState: InitialState<User | Profile>,
  formData: FormData,
): Promise<InitialState<User | Profile>> => {
  'use server'
  const result = await registerUserProfile(
    prevState as InitialState<ZUser>,
    formData,
  )
  if (result.ok) {
    return { ok: true, errors: {} }
  }
  return {
    errors: { request: result.error.message },
  }
}

export default async function RegisterUser() {
  let options: OptionGeneric<User | Profile>[] = [
    {
      label: 'Selecione',
      value: '',
    },
  ]
  const rolesSystem: Roles = roles
  for (const key in rolesSystem) {
    options = [
      ...options,
      {
        label: rolesSystem[key as keyof Roles] as string,
        value: rolesSystem[key as keyof Roles] as string,
      },
    ]
  }
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: options,
  }

  const responseUnits = await listSelectUnits()
  if (responseUnits.error) {
    return (
      <ErrorState
        title="Erro ao carregar unidades"
        message={String(responseUnits.error.message)}
      />
    )
  }
  const units = responseUnits.response ?? []
  const unitOptions: OptionGeneric<User | Profile>[] = units.map((unit) => ({
    label: unit.name,
    value: unit.id,
  }))
  templateForm.sections[1].boxes[1].fields[0].option = {
    ...templateForm.sections[1].boxes[1].fields[0].option,
    list: unitOptions,
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<User | Profile>
            action={submitRegisterUser}
            templateForm={templateForm}
            pathSuccess="dashboard/users"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
