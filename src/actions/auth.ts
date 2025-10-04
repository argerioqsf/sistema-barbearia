'use server'

import { InitialState } from '@/types/general'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function actionDefault<T>(
  _prevState: InitialState<T>, // eslint-disable-line @typescript-eslint/no-unused-vars
  _formData: FormData, // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<InitialState<T>> {
  return {
    errors: {},
    ok: true,
  }
}
