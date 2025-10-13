import ContainerDashboard from '@/components/molecules/ContainerDashboard'
import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const roadmapHighlights = [
  {
    title: 'Relatórios inteligentes',
    description:
      'Uma visão consolidada das vendas, produtividade e finanças da barbearia em um só lugar.',
  },
  {
    title: 'Gráficos em tempo real',
    description:
      'Painéis atualizados automaticamente para acompanhar o desempenho da equipe e metas diárias.',
  },
  {
    title: 'Alertas personalizados',
    description:
      'Notificações para receber insights sobre oportunidades, clientes inativos e metas de receita.',
  },
]

const quickLinks = [
  {
    label: 'Abrir vendas',
    href: '/dashboard/sales',
    description: 'Gerencie e acompanhe todas as vendas realizadas na unidade.',
  },
  {
    label: 'Finanças',
    href: '/dashboard/financial/transactions',
    description: 'Monitore transações, comissões e retiradas em andamento.',
  },
  {
    label: 'Equipe',
    href: '/dashboard/users',
    description: 'Administre usuários, permissões e indicadores da equipe.',
  },
]

export default function Home() {
  return (
    <ContainerDashboard>
      <div
        className={cn(
          'relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-foreground',
        )}
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 pb-12 pt-8 sm:px-6 lg:px-10">
          <PageCard>
            <PageCardContent className="space-y-6">
              <SectionHeader
                label="Bem-vindo"
                title="Central de insights em construção"
                description="Em breve você terá aqui gráficos, tendências e relatórios que ajudam a tomar decisões rápidas sobre o negócio."
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {roadmapHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-5 shadow-sm shadow-slate-200/60"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                      Em breve
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 truncate">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </PageCardContent>
          </PageCard>

          <PageCard>
            <PageCardContent className="space-y-6">
              <SectionHeader
                label="Enquanto isso"
                title="Continue acompanhando as principais áreas"
                description="Acesse as seções existentes para monitorar vendas, finanças e equipe enquanto a nova experiência é preparada."
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-5 shadow-sm shadow-slate-200/60 transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-primary-700">
                      {link.label}
                    </span>
                    <p className="text-xs text-slate-500 truncate">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </PageCardContent>
          </PageCard>
        </div>
      </div>
    </ContainerDashboard>
  )
}
