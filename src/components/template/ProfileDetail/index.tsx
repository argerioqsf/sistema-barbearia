import { editProfile, getProfile } from '@/actions/profile'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { templateForm } from './templateForm'

export default async function ProfileDetail() {
  const response = await getProfile()
  const profile = response?.response
  const errorRequest = response.error?.request

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            schemaName="EditProfile"
            action={editProfile}
            templateForm={templateForm}
            defaultValues={profile}
            pathSuccess="/"
            errorRequest={errorRequest}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
