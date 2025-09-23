'use client'

import { listUsersAllAction } from '@/actions/user'
import { useEffect, useState } from 'react'
import { Button, InputForm, LabelForm, TitleForm } from '@/components/atoms'
import { ZUser } from '@/features/users/schemas'
import { onUnauthorizedDefault } from '@/shared/errors/onUnauthorized'

interface CustomerInfoProps {
  setCustomer: (customer: ZUser) => void
  nextStep: () => void
  prevStep: () => void
}

export function CustomerInfo({
  setCustomer,
  nextStep,
  prevStep,
}: CustomerInfoProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState<ZUser[]>([])
  const [selectedUser, setSelectedUser] = useState<ZUser | null>(null)

  useEffect(() => {
    async function loadUsers() {
      const result = await listUsersAllAction()
      if (!result.ok) {
        if (result.error.type === 'http' && result.error.status === 401) {
          onUnauthorizedDefault()
        }
      } else {
        setUsers(result.data)
      }
    }
    if (searchTerm.length > 2) {
      loadUsers()
    }
  }, [searchTerm])

  const handleNext = () => {
    if (selectedUser) {
      setCustomer(selectedUser)
      nextStep()
    }
  }

  return (
    <div>
      <TitleForm title="Informações do Cliente" />
      <div className="mt-4">
        <LabelForm
          label="Buscar Cliente"
          htmlFor="customerName"
          className="text-lg mb-2 text-foreground"
        />
        <InputForm
          id="customerName"
          name="customerName"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary"
        />
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${selectedUser?.id === user.id ? 'bg-primary-50/20 border-primary shadow-lg' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}
              onClick={() => setSelectedUser(user)}
            >
              <p className="font-bold text-lg text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>
          ))}
          {selectedUser && (
            <Button
              variant="outline"
              onClick={() => setSelectedUser(null)}
              className="w-full mt-4 bg-gray-200 border-gray-300 text-gray-800 hover:bg-gray-300"
            >
              Limpar Seleção
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={prevStep}
          className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedUser}
          className="w-full sm:w-auto bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
