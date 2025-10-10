# Guia de Layout e Design – Padrão POS

Este documento centraliza o padrão visual que estamos adotando no projeto (inspirado no POS), além de boas práticas para implementação em novas telas e na migração das existentes.

## Objetivos
- Manter consistência visual e semântica entre telas.
- Reduzir CSS/markup ad hoc usando componentes reutilizáveis.
- Garantir que a troca de cores do perfil funcione em qualquer tela via tokens.
- Promover acessibilidade, responsividade e UX previsível.

## Princípios
- Consistência acima de customização pontual.
- Preferir componentes e tokens em vez de cores/medidas “hardcoded”.
- Layouts respiráveis: espaços generosos e hierarquia clara de títulos.
- Acessibilidade: foco visível, labels e estados vazios úteis.

## Tokens de Cores e Tema
Os tokens de cor vêm do Tailwind configurado em `tailwind.config.ts` e são alimentados por variáveis CSS. A função `applyPalette` (ColorPalette) atualiza os tokens dinamicamente:

```
document.documentElement.style.setProperty('--primary', '<H S% L%>')
document.documentElement.style.setProperty('--primary-50', '<H S% L%>')
document.documentElement.style.setProperty('--secondary', '<H S% L%>')
...
```

Use SEMPRE utilitários do Tailwind baseados em tokens:
- Fundo e texto: `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-foreground`, `bg-background`.
- Borda e anéis: `border`, `ring`, `ring-primary`.
- Tons auxiliares: `muted`, `accent`, `destructive`.
- Evite hexadecimais diretos em classes ou `style={}`. Isso impede que o tema reflita a paleta escolhida.

Escalas recomendadas (quando aplicável): `primary-50`, `primary-100`, `secondary-50`, `secondary-100` para variações suaves de cartão/estado.

## Tipografia
- Títulos de página/seção: `text-2xl` a `text-3xl`, `font-semibold`, cor `text-slate-900`.
- Descrições: `text-sm` com `text-slate-500`.
- Rótulo superior (eyebrow): `text-xs`, `uppercase`, `tracking-widest`, `text-slate-400`.

## Espaçamentos e Grid
- Shell da página (dentro de `ContainerDashboard`): `px-4 sm:px-6 lg:px-10`, `gap-6` entre cartões.
- Cartões (conteúdo interno): `px-6 py-6 sm:px-8 sm:py-8`.
- Grid padrão de página: duas colunas em telas largas – conteúdo principal à esquerda e painéis/summary à direita.

## Componentes Reutilizáveis

### PageCard e SectionHeader
- `PageCard`: cartão com borda arredondada, sombra e `backdrop-blur` no padrão POS.
- `SectionHeader`: cabeçalho de seção padronizado com label, título, descrição e área de ações.

Exemplo:

```tsx
import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'

export function ExampleCard() {
  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Seção"
          title="Título do Card"
          description="Pequena descrição com propósito ou instruções."
          right={<button className="btn">Ação</button>}
        />
        <div className="mt-6">{/* conteúdo */}</div>
      </PageCardContent>
    </PageCard>
  )
}
```

### Card (baixo nível)
`src/components/ui/card.tsx` fornece elementos para composições mais específicas quando `PageCard` for excessivo.

### Botões e Inputs
- Botões: `src/components/ui/button.tsx` (variants `default`, `secondary`, `ghost`, etc.).
- Inputs: `src/components/ui/input.tsx` e campos form existentes em `atoms`.

## Layout de Página (Shell)
Use o shell abaixo para telas de dashboard (mesmo padrão do POS e Perfil):

```tsx
<ContainerDashboard>
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-foreground">
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-[calc(var(--navbar-height)+2.4rem)] pb-12 flex flex-col gap-6">
      {/* Breadcrumb / Header / Grid */}
    </div>
  </div>
 </ContainerDashboard>
```

## Estados (Loading, Vazio, Erro)
- Loading: mensagens claras e discretas dentro do cartão (ex.: `p-6 text-slate-500`).
- Vazio: explique o próximo passo (“Nenhum item… Adicione o primeiro em …”).
- Erro: use `ErrorRequestHandler` para padronizar o feedback.

## Acessibilidade
- `focus-visible:ring-2` em elementos interativos (botões, cartões clicáveis).
- Texto alternativo e `aria-label` em ícones isolados.
- Contraste adequado: priorize tokens sobre cores fixas.

## Guia de Migração de Telas
1) Envolva blocos principais em `PageCard` e use `SectionHeader` para títulos.
2) Converta cores fixas para tokens Tailwind (ex.: `text-[#111]` → `text-slate-900`).
3) Normalize espaçamentos para o shell padrão e `PageCardContent`.
4) Evite inline-styles de cor. Prefira classes utilitárias baseadas em tokens.
5) Mensagens de estado (loading/empty/error) consistentes no interior de cada cartão.

## Boas Práticas e “Não Faça”
- Não inserir cores/medidas mágicas em `style={{}}` quando houver token/classe.
- Não repetir headers customizados em cada card; use `SectionHeader`.
- Evitar grids profundos aninhados – priorize hierarquia rasa de cartões e seções.

## Referências de Implementação
- Padrão POS: `src/modules/sales-pos/ui/components/templates/PointOfSale/index.tsx:1`.
- Perfil já migrado: `src/components/template/ProfileDetail/index.tsx:1`.
- Monitoramento (colaborador): `src/components/template/CollaboratorMonitoring/index.tsx:1`.
- Átomos/moléculas úteis: `src/components/ui/*` e `src/components/atoms/*`.

---

### Anexo – Integração com Formulários
`FormDashboard` ganhou as props `renderHeader?: boolean`, `formId?: string` e `submitLabel?: string`. Para usar o layout novo:

```tsx
const formId = 'profile-detail-form'

<SectionHeader
  title="Informações pessoais"
  right={
    <Button form={formId} type="submit">Salvar</Button>
  }
/>

<FormDashboard
  renderHeader={false}
  formId={formId}
  // demais props
/>
```

O botão externo usa o atributo `form` para enviar o `<form>` renderizado dentro do `FormDashboard`, mantendo o cabeçalho padronizado.
