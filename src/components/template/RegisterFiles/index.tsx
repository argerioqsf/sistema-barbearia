import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { templateForm } from './templateForm'
import { registerFile } from '@/actions/file'

export default function RegisterFiles() {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<{ avatar: string }>
            action={registerFile}
            templateForm={templateForm}
            pathSuccess="dashboard/indicators/files"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
