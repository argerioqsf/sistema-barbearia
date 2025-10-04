import { RoleName } from '@/features/roles/schemas'

const verifyPermissionGeneral = {
  all: (roleUser: RoleName) => ['OWNER', 'ADMIN'].includes(roleUser),
}

const verifyPermissionUser = {
  'user.edit.role': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.edit.own.active': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.view': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.detail': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.register': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
  'user.list': (roleUser: RoleName) => ['ADMIN'].includes(roleUser),
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
    [
      'OWNER',
      'ADMIN',
      'indicator',
      'consultant',
      'financial',
      'auxiliary',
    ].includes(roleUser),
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
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'products.list': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'products.register': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionCoupons = {
  'coupons.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'coupons.list': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
  'coupons.register': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionAppointments = {
  'appointments.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionCashier = {
  'cashier.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionSales = {
  'sales.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
    return roles.includes(roleUser)
  },
}

const verifyPermissionSettings = {
  'settings.view': (roleUser: RoleName) => {
    const roles: RoleName[] = ['ADMIN', 'BARBER', 'MANAGER']
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
}

export type UserAction = keyof typeof verifyPermission

export function checkUserPermissions(
  userAction: UserAction,
  roleUser?: RoleName,
): boolean {
  if (!roleUser) return false
  return verifyPermission[userAction](roleUser)
}
