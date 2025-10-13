import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from './api'

export function useCategoriesOptions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  })

  const options = data?.categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  return { options, isLoading, isError }
}
