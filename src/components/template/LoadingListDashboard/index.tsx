import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import React from 'react'
import { Skeleton } from '@/components/atoms/Skeleton'

export default function LoadingListDashboard() {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex-col grid justify-center items-start grid-cols-9 grid-rows-12">
        <div className="col-span-9 row-span-1 w-full h-full">
          <Breadcrumb />
        </div>

        <Skeleton className="col-span-3 row-span-1 h-12 rounded-full" />
        <div className="col-span-6 row-span-1" />

        <div className="flex flex-row justify-between col-span-9 row-span-1 h-10  mt-9">
          <Skeleton className="w-64 h-full" />
          <Skeleton className="w-52 h-full" />
        </div>

        <div className="col-span-9 row-span-7  h-full mt-14">
          <Skeleton className="col-span-9 row-span-1 h-20 rounded-full" />
          <Skeleton className="col-span-9 row-span-1 h-20 rounded-full mt-5" />
          <Skeleton className="col-span-9 row-span-1 h-20 rounded-full mt-5" />
          <Skeleton className="col-span-9 row-span-1 h-20 rounded-full mt-5" />
          <Skeleton className="col-span-9 row-span-1 h-20 rounded-full mt-5" />
        </div>
      </div>
    </ContainerDashboard>
  )
}
