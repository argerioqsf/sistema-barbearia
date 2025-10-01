export type Primitive = string | number | boolean | null
// eslint-disable-next-line no-use-before-define
export type JsonValue = Primitive | JsonObject | JsonArray
export interface JsonObject {
  [key: string]: JsonValue | undefined
}
export interface JsonArray extends Array<JsonValue> {}

// Query string parameters (values serialized to strings)
export type QueryParams<T, W extends boolean = boolean> = Partial<T> & {
  withCount?: W
  perPage?: number
  page?: string
}

// export type QueryParamsPaginated<W> = {
//   withCount?: W
//   perPage?: number
//   page?: string
// }

// export type QueryParamsDefault<T, W> = Partial<T> & {
//   withCount?: W
// }
// // Query string parameters (values serialized to strings)
// export type QueryParams<T, W extends boolean = true> = QueryParamsDefault<
//   T,
//   W
// > &
//   QueryParamsPaginated<W>

export type ReturnListPaginated<T> = {
  items: T[]
  count: number
  page: number
  perPage: number
}

export type ReturnList<T> =
  | { type: 'list'; data: T[] }
  | { type: 'paginated'; data: ReturnListPaginated<T> }
