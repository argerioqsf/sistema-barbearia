import { RoleName } from '@/features/roles/schemas'

const verifyPermissionGeneral = {
  all: (roleUser: RoleName) => ['OWNER', 'ADMIN'].includes(roleUser),
}

const verifyPermissionUser = {
  'user.edit.role': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.edit.own.active': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.view': (roleUser: RoleName) => ['ADMIN', 'OWNER'].includes(roleUser),
  'user.detail': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.register': (roleUser: RoleName) =>
    ['ADMIN', 'OWNER'].includes(roleUser),
  'user.list': (roleUser: RoleName) => ['ADMIN', 'OWNER'].includes(roleUser),
  'user.list.disabled': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.resetPassword': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
}

const verifyPermissionUnit = {
  'unit.view': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'unit.detail': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'unit.register': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'unit.list': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
}

const verifyPermissionProfile = {
  'profile.view': (roleUser: RoleName) =>
    ['OWNER', 'ADMIN', 'BARBER', 'MANAGER'].includes(roleUser),
}

const verifyPermissionFile = {
  'file.create': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'file.delete': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
}

const verifyPermissionDashboard = {
  'dashboard.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'BARBER', 'MANAGER', 'ADMIN']
    return roles.includes(roleUser)
  },
}

const verifyPermissionOrganization = {
  'organization.detail': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN']
    return roles.includes(roleUser)
  },
  'organization.update': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN']
    return roles.includes(roleUser)
  },
}

const verifyPermissionProducts = {
  'products.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'products.list': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'products.register': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionCoupons = {
  'coupons.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'coupons.list': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'coupons.register': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionAppointments = {
  'appointments.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionCashier = {
  'cashier.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionSales = {
  'sales.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER', 'OWNER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionSettings = {
  'settings.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'OWNER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionMonitoring = {
  'collaborator.monitoring.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['BARBER', 'ADMIN']
    return roles.includes(roleUser)
  },
}

const verifyPermissionServices = {
  'services.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN', 'MANAGER']
    return roles.includes(roleUser)
  },
  'services.list': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN', 'MANAGER']
    return roles.includes(roleUser)
  },
  'services.register': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionFinancial = {
  'financial.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN']
    return roles.includes(roleUser)
  },
  'financial.payCommission': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN']
    return roles.includes(roleUser)
  },
  'financial.transactions.list': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN']
    return roles.includes(roleUser)
  },
  'financial.withdrawals': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN']
    return roles.includes(roleUser)
  },
}

const verifyPermissionCategories = {
  'categories.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN', 'MANAGER']
    return roles.includes(roleUser)
  },
  'categories.register': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN', 'MANAGER']
    return roles.includes(roleUser)
  },
  'categories.list': (roleUser: RoleName) => {
    const roles: RoleName[] = ['OWNER', 'ADMIN', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermission = {
  ...verifyPermissionGeneral,
  ...verifyPermissionUser,
  ...verifyPermissionUnit,
  ...verifyPermissionProfile,
  ...verifyPermissionDashboard,
  ...verifyPermissionOrganization,
  ...verifyPermissionFile,
  ...verifyPermissionProducts,
  ...verifyPermissionCoupons,
  ...verifyPermissionAppointments,
  ...verifyPermissionCashier,
  ...verifyPermissionSales,
  ...verifyPermissionSettings,
  ...verifyPermissionMonitoring,
  ...verifyPermissionServices,
  ...verifyPermissionFinancial,
  ...verifyPermissionCategories,
}

export type UserAction = keyof typeof verifyPermission

export function checkUserPermissions(
  userAction: UserAction,
  roleUser?: RoleName,
): boolean {
  if (!roleUser) return false
  return verifyPermission[userAction](roleUser)
}
