'use client'

import ErrorState from '@/components/molecules/ErrorState'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <ErrorState
        title="Erro inesperado no dashboard"
        message={error?.message || 'Tente novamente mais tarde.'}
      />
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-md bg-black text-white hover:opacity-90"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
