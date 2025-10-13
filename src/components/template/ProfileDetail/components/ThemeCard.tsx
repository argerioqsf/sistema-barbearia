import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import ColorPalette from '@/components/molecules/ColorPalette'

export default function ThemeCard() {
  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Preferências"
          title="Tema"
          description="Escolha a paleta de cores para personalizar sua experiência."
        />
        <div className="mt-4">
          <ColorPalette />
        </div>
      </PageCardContent>
    </PageCard>
  )
}
