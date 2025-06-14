'use client'

import { Button, Text } from '@/components/atoms'
import { HeaderList } from '@/components/molecules'
import ItemList from '@/components/molecules/ItemList'
import { Pagintaion } from '@/components/molecules/Pagination'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { InfoList, ListAction } from '@/types/general'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { z } from 'zod'

type ListingProps<T> = {
  title?: string
  textButton?: string
  hrefButton?: string
  list: T[] | null
  listActions?: Array<ListAction<T>>
  variant?: 'default' | 'segmented'
  loading?: boolean
  errorMessage?: string
  infoList: InfoList<T>
  count: number | null
}

export default function Listing<T>({
  listActions,
  title,
  textButton,
  hrefButton,
  list,
  variant = 'default',
  loading,
  errorMessage,
  infoList,
  count,
}: ListingProps<T>) {
  const [showDot, setShowDot] = useState('')
  const { pushRouter } = useHandlerRouter()
  const { listTransform } = useItemListTransform()
  const listTransformResp = listTransform(list ?? [], infoList.itemsList)
  const paths = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  function handlePaginate(pageIndex: number) {
    const queryQ = searchParams.get('q') && `q=${searchParams.get('q')}&`
    const queryPage = `page=${pageIndex}`
    const path = `${paths}?${queryQ ?? ''}${queryPage ?? ''}`
    router.push(path)
  }

  return (
    <div
      className={twJoin(
        'w-[90vw] md:w-full flex flex-col justify-center items-center',
        variant === 'segmented' && 'p-[1vw] rounded-xl bg-gray-500',
      )}
    >
      <div className="w-full p-3 rounded-full flex flex-row justify-between items-center">
        <Text
          className={twMerge(
            `uppercase ml-4 font-bold text-xl lg:text-2xl ${
              variant === 'default' ? 'text-black' : 'text-white'
            } whitespace-nowrap overflow-hidden text-ellipsis`,
          )}
        >
          {title}
        </Text>
        {textButton && (
          <Button
            onClick={async () => await pushRouter(hrefButton)}
            className="rounded-full mr-1 h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-100 text-white"
            type="button"
          >
            {textButton}
          </Button>
        )}
      </div>
      {infoList.itemsHeader && infoList.itemsHeader.length > 0 && (
        <div
          className={twMerge(
            variant === 'segmented'
              ? 'w-[88vw] md:w-full'
              : 'w-[90vw] md:w-full',
          )}
        >
          <HeaderList
            actions={!!listActions}
            itemsHeader={infoList.itemsHeader}
          />
        </div>
      )}

      {listTransformResp !== undefined ? (
        <div
          className={twMerge(
            'w-full flex flex-col justify-start items-center border-secondary-50 border rounded-t-2xl rounded-b-2xl',
            variant === 'segmented' && 'w-[88vw] lg:w-[93vw]',
          )}
        >
          {listTransformResp?.map((item, idx) => (
            <ItemList
              length={listTransformResp.length}
              showDot={showDot}
              setShowDot={setShowDot}
              key={item.id}
              listActions={listActions}
              idx={idx + 1}
              item={item}
              id={item.id}
            />
          ))}
        </div>
      ) : loading ? (
        <div className="w-full h-[20vh] p-4 flex justify-center items-center">
          <Text>Loading...</Text>
        </div>
      ) : (
        errorMessage && (
          <div className="w-full h-[20vh] p-4 flex justify-center items-center">
            <Text>{errorMessage}</Text>
          </div>
        )
      )}
      <div className="w-full mt-6">
        <Pagintaion
          onPageChange={handlePaginate}
          pageIndex={pageIndex}
          totalCount={count ?? 0}
          perPage={10}
        />
      </div>
    </div>
  )
}
