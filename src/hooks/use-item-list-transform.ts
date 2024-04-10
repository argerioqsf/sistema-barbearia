import { FieldsList, ItemListType, Models } from '@/types/general'

export const useItemListTransform = () => {
  const listTransform = (
    list: Models[],
    fields: FieldsList,
  ): ItemListType[] => {
    if (!list) return []
    return list?.map((item) => {
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
            const value = getItemValue(item, field)
            if (value !== undefined) {
              count++
              const key = `info${count}` as keyof ItemListType
              newItem[key] =
                typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value
            }
          } else {
            count++
          }
        })
      }

      return newItem
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getItemValue = (item: Models, field: string): any => {
    const keys = field.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = item
    for (const key of keys) {
      value = value?.[key]
    }
    return value
  }

  return { listTransform }
}
