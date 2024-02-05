import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const usePathTranslations = (componentPath?: string) => {
  const at = useTranslations("general");
  const or = useTranslations("organisms");
  const any = useTranslations(componentPath);

  return { at, or, any };
};

export const usePathTranslationsMetadata = (
  locale: string,
  namespace: string
) => {
  const meta = getTranslations({ locale, namespace: `metadata.${namespace}` });

  return meta;
};
