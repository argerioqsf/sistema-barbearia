import { Button, Text } from '@/components/atoms'
import { closeCashSession } from '@/actions/cash-session'

export default function CloseForm() {
  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm">
      <div className="px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
        <Text className="font-semibold text-gray-800">Fechar caixa</Text>
      </div>
      <div className="p-6">
        <form
          action={async () => {
            'use server'
            await closeCashSession()
          }}
        >
          <Button type="submit" className="bg-red-500 text-white">
            Fechar
          </Button>
        </form>
      </div>
    </div>
  )
}
