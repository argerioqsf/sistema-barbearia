import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const usePathTranslations = (componentPath?: string) => {
  const at = useTranslations('general')
  const sc = useTranslations('specific')
  const t = useTranslations(componentPath)

  return { at, sc, t }
}

export const usePathTranslationsMetadata = (
  locale: string,
  namespace: string,
) => {
  const meta = getTranslations({ locale, namespace: `metadata.${namespace}` })

  return meta
}
