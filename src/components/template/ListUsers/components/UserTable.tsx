'use client'

import type { ZUser } from '@/features/users/schemas'
import {
  DataListEmptyState,
  DataListTable,
  type DataListColumn,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import Link from 'next/link'
import { UserRoleBadge } from './UserRoleBadge'
import { UserStatusBadge } from './UserStatusBadge'
import { ToggleUserButton } from './ToggleUserButton'

const columns: DataListColumn<ZUser>[] = [
  {
    key: 'name',
    header: 'Usuário',
    render: (user) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900">{user.name}</span>
        <span className="text-xs text-slate-500">{user.email}</span>
      </div>
    ),
  },
  {
    key: 'profile.role.name',
    header: 'Permissão',
    render: (user) => <UserRoleBadge role={user.profile?.role?.name} />,
  },
  {
    key: 'active',
    header: 'Status',
    render: (user) => <UserStatusBadge active={user.active} />, // assume active flag
  },
  {
    key: 'actions',
    header: 'Ações',
    align: 'right',
    render: (user) => (
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Link
          href={`/dashboard/users/detail/${user.id}`}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Detalhes
        </Link>
        <ToggleUserButton key="toggle" userId={user.id} active={user.active} />
      </div>
    ),
  },
]

type UserTableProps = {
  users: ZUser[]
}

export function UserTable({ users }: UserTableProps) {
  if (users.length === 0) {
    return (
      <DataListEmptyState
        title="Nenhum usuário encontrado."
        description="Use a busca ou cadastre um novo usuário."
      />
    )
  }

  return (
    <DataListTable
      items={users}
      columns={columns}
      getRowId={(user) => user.id}
    />
  )
}
