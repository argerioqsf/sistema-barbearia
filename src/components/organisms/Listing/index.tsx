'use client'

import { Button, Text } from '@/components/atoms'
import { HeaderList } from '@/components/molecules'
import ItemList from '@/components/molecules/ItemList'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { InfoList, ListAction } from '@/types/general'
import { twJoin, twMerge } from 'tailwind-merge'

type ListingProps<T> = {
  title?: string
  textButton?: string
  hrefButton?: string
  list: T[] | null
  listActions?: Array<ListAction>
  variant?: 'default' | 'segmented'
  loading?: boolean
  errorMessage?: string
  infoList: InfoList<T>
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
}: ListingProps<T>) {
  const { pushRouter } = useHandlerRouter()
  const { listTransform } = useItemListTransform()
  const listTransformResp = listTransform(list ?? [], infoList.itemsList)
  return (
    <div
      className={twJoin(
        'w-[90vw] md:w-full flex flex-col justify-center items-center',
        variant === 'segmented' && 'p-[1vw] rounded-xl bg-gray-500',
      )}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <Text
          className={twMerge(
            `uppercase font-bold text-2xl lg:text-4xl ${
              variant === 'default' ? 'text-black' : 'text-white'
            } whitespace-nowrap overflow-hidden text-ellipsis`,
          )}
        >
          {title}
        </Text>
        {textButton && (
          <Button
            onClick={async () => await pushRouter(hrefButton)}
            className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
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
          <HeaderList itemsHeader={infoList.itemsHeader} />
        </div>
      )}

      {listTransformResp !== undefined ? (
        <div
          className={twMerge(
            'w-full mt-4 flex flex-col gap-4 pb-4 justify-start items-center',
            variant === 'segmented' && 'w-[88vw] lg:w-[93vw]',
          )}
        >
          {listActions &&
            listTransformResp?.map((item, idx) => (
              <ItemList
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
    </div>
  )
}
