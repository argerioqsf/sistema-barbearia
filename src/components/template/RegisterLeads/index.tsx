import { listSelectConsultants } from '@/actions/consultant'
import { registerLead } from '@/actions/lead'
import { listSelectUnits } from '@/actions/unit'
import { listIndicators } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { Lead, Unit, User } from '@/types/general'
import { templateForm } from './templateForm'

export default async function RegisterLeads() {
  const responseIndicators = await listIndicators()
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: [...(responseIndicators?.response ?? [])],
  }

  const responseConsultants = await listSelectConsultants()
  const consultants = responseConsultants?.response ?? []
  templateForm.sections[2].boxes[0].fields[0].option = {
    ...templateForm.sections[2].boxes[0].fields[0].option,
    list: [...consultants],
  }

  const responseUnits = await listSelectUnits()
  const units = responseUnits?.response ?? []
  templateForm.sections[3].boxes[0].fields[0].option = {
    ...templateForm.sections[3].boxes[0].fields[0].option,
    list: [...units],
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<User | Lead | Unit>
            templateForm={templateForm}
            action={registerLead}
            pathSuccess="/dashboard/leads"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
