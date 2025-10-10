import { ReactNode } from 'react'
import { SectionHeader } from '@/components/ui/section-header'
import { PageCard, PageCardContent } from '@/components/ui/page-card'

type DataListLayoutProps = {
  title: string
  description?: string
  label?: string
  action?: ReactNode
  children: ReactNode
}

export function DataListLayout({
  title,
  description,
  label,
  action,
  children,
}: DataListLayoutProps) {
  return (
    <PageCard>
      <PageCardContent className="space-y-6">
        <SectionHeader
          label={label}
          title={title}
          description={description}
          right={action}
        />

        {children}
      </PageCardContent>
    </PageCard>
  )
}
