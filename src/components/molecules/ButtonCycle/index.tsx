import { createCycle, endCycle } from '@/actions/lead'
import { Cyclo } from '@/types/general'
import IconAction from '../IconAction'

interface ButtonCycleProps {
  activeCycle?: Cyclo
  idOrganization: string
}

export function ButtonCycle({ activeCycle, idOrganization }: ButtonCycleProps) {
  return activeCycle && activeCycle.id ? (
    <IconAction
      onClick={endCycle.bind(null, activeCycle.id)}
      size={35}
      classIcon="w-full rounded-xl border-transparent text-white bg-red-700"
      toastInfo={{ title: 'Ciclo fnalizado com sucesso' }}
      alertInfo={{ title: 'Realmente deseja finalizar o ciclo atual' }}
    >
      Finalizar ciclo
    </IconAction>
  ) : (
    <IconAction
      onClick={createCycle.bind(null, idOrganization)}
      size={35}
      classIcon="w-full rounded-xl border-transparent text-white bg-secondary-50"
      toastInfo={{ title: 'Ciclo inicializado com sucesso' }}
      alertInfo={{ title: 'Realmente deseja iniciar o ciclo atual' }}
    >
      Iniciar ciclo
    </IconAction>
  )
}
