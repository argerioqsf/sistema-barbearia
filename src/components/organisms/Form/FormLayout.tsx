import { ReactNode } from 'react'
import { SectionHeader } from '@/components/ui/section-header'
import { PageCard, PageCardContent } from '@/components/ui/page-card'

type FormLayoutProps = {
  title: string
  description?: string
  label?: string
  children: ReactNode
  cta?: ReactNode
}

export function FormLayout({
  title,
  description,
  label,
  children,
  cta,
}: FormLayoutProps) {
  return (
    <div className="min-w-0 px-6 py-6 sm:px-8 sm:py-8">
      <PageCard>
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
    </div>
  )
}
