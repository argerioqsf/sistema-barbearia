'use client'

import { getUnit, updateUnit } from '@/actions/unit'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import useRegisterUnit from '@/hooks/use-register-unit'
import { Segment, Unit } from '@/types/general'
import { useEffect, useState } from 'react'
import { templates } from './templates'

export default function DetailUnits({ id }: { id: string }) {
  const { templateForm, listSegment } = useRegisterUnit(templates.templateForm)
  const [unit, setUnit] = useState<Unit>()
  const { pushRouter } = useHandlerRouter()

  useEffect(() => {
    async function loadUnit() {
      const response = await getUnit(id)
      const unitLoad = response?.response ?? null
      if (!unitLoad) {
        pushRouter('404/')
      } else {
        setUnit({ ...unitLoad })
        listSegment(unitLoad)
      }
    }
    loadUnit()
  }, [id, listSegment, pushRouter])

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8 grid gap-8">
          <FormDashboard<Unit | Omit<Segment, 'courses'>>
            title={templates.templateForm.title}
            templateForm={templateForm}
            defaultValues={unit}
            actionWithId={updateUnit}
            pathSuccess="/dashboard/units"
            id={id}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
