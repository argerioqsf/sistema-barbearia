import { FieldsList, ItemListType, LimitFields } from '@/types/general'

export const useItemListTransform = () => {
  const listTransform = <T>(
    list: T[],
    fields: LimitFields<FieldsList<T>>,
  ): ItemListType[] => {
    if (!list) return []
    return list.length > 0
      ? list?.map((item) => {
          const newItem: ItemListType = {
            id: '0',
            info1: '',
            info2: '',
            info3: '',
            info4: '',
            info5: '',
          }

          let count = 0

          if (fields) {
            fields.forEach((field) => {
              if (field !== '') {
                const value = getItemValue<T>(item, field)
                if (value !== undefined) {
                  count++
                  const itemId = item as T & { id: string }
                  const key = `info${count}` as keyof ItemListType
                  newItem.id = itemId.id
                  newItem[key] =
                    typeof value === 'boolean'
                      ? value
                        ? 'Sim'
                        : 'Não'
                      : String(value)
                }
              } else {
                count++
              }
            })
          }

          return newItem
        })
      : []
  }

  const getItemValue = <T>(
    item: T,
    field: FieldsList<T>,
  ): string | number | boolean => {
    const keys = field.split('.')
    type Value =
      | {
          [key in keyof T]: Value
        }
      | string
      | number
      | boolean

    let value = item as Value
    for (const key of keys) {
      if (typeof value === 'object') {
        value = value[key as keyof Value] ?? 'Empty'
      }
    }
    return typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
      ? value
      : 'Empty'
  }

  return { listTransform, getItemValue }
}
