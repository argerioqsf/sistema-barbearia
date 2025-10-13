import { ReactNode } from 'react'
import { SectionHeader } from '@/components/ui/section-header'
import { PageCard, PageCardContent } from '@/components/ui/page-card'

type FormLayoutProps = {
  title: string
  description?: string
  label?: string
  children: ReactNode
  cta?: ReactNode
  className?: string
}

export function FormLayout({
  title,
  description,
  label,
  children,
  cta,
  className,
}: FormLayoutProps) {
  return (
    <PageCard className={className}>
      <PageCardContent className="space-y-6">
        <SectionHeader
          label={label}
          title={title}
          description={description}
          cta={cta}
        />
        {children}
      </PageCardContent>
    </PageCard>
  )
}
