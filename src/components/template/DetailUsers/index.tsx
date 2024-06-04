import { listSelectUnits } from '@/actions/unit'
import { getUser, updateUserProfile } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import roles from '@/constants/roles.json'
import { Option, Profile, Roles, Unit, User } from '@/types/general'
import { notFound } from 'next/navigation'
import * as templates from './templates'

export default async function DetailUsers({ id }: { id: string }) {
  const response = await getUser(id)
  const user = response.response
  if (!user) {
    notFound()
  }
  const errorRequest = response.error?.request ?? undefined

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
  const responseUnits = await listSelectUnits()
  const units = responseUnits?.response ?? []

  templates.templateForm.sections[1].boxes[1].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[1].fields[0].option,
    list: [...units],
    values: user?.profile?.units?.map((unit) => unit.unit.id),
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
            errorRequest={errorRequest}
            id={id}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
