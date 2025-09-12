export type Primitive = string | number | boolean | null
// eslint-disable-next-line no-use-before-define
export type JsonValue = Primitive | JsonObject | JsonArray
export interface JsonObject {
  [key: string]: JsonValue | undefined
}
export interface JsonArray extends Array<JsonValue> {}

// Query string parameters (values serialized to strings)
export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>
