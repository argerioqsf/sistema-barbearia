import { useTranslations } from 'next-intl';

export const usePathTranslations = (componentPath?: string) => {
  const te = useTranslations(`template.${componentPath}`);
  const at = useTranslations('general');
  const mo = useTranslations('molecules');
  const or = useTranslations('organisms');

  return { te, at, mo, or };
};
