import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const usePathTranslations = (componentPath?: string) => {
  const at = useTranslations('general')
  const sc = useTranslations('specific')
  const any = useTranslations(componentPath)

  return { at, sc, any }
}

export const usePathTranslationsMetadata = (
  locale: string,
  namespace: string,
) => {
  const meta = getTranslations({ locale, namespace: `metadata.${namespace}` })

  return meta
}
