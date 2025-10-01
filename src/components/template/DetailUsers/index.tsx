import { listSelectUnits } from '@/actions/unit'
import { getUser, updateUserProfile } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import roles from '@/constants/roles.json'
import { Option, Profile, Roles, Unit, User } from '@/types/general'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/molecules/ErrorState'
import * as templates from './templates'

export default async function DetailUsers({ id }: { id: string }) {
  const result = await getUser(id)
  if (!result.ok) {
    return (
      <ErrorState
        title="Erro ao carregar usuário"
        message={String(result.error.message)}
      />
    )
  }
  const user = result.data as unknown as User
  if (!user) {
    notFound()
  }

  let options: Option[] = [
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
  templates.templateForm.sections[1].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[0].fields[0].option,
    list: options,
  }
  const unitsResult = await listSelectUnits()
  if (unitsResult.error) {
    return (
      <ErrorState
        title="Erro ao carregar unidades"
        message={String(unitsResult.error.message)}
      />
    )
  }
  const units = unitsResult.response ?? []

  templates.templateForm.sections[1].boxes[1].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[1].fields[0].option,
    list: [...units],
    values: user.profile?.units?.map((association) => association.unit.id),
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8 grid gap-8">
          <FormDashboard<User | Profile | Unit>
            title={templates.templateForm.title}
            templateForm={templates.templateForm}
            defaultValues={user}
            actionWithId={updateUserProfile}
            pathSuccess="/dashboard/users"
            errorRequest={undefined}
            id={id}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
