const permissionCheckers = {
  setRole: (roleUser: string) => roleUser === 'administrator',
  setRole2: (roleUser: string) => roleUser === 'administrator',
}

type Feature = keyof typeof permissionCheckers

export function verifyPermissionUser(
  feature: Feature,
  roleUser: string,
): boolean {
  const permissionChecker = permissionCheckers[feature]
  if (permissionChecker) {
    return permissionChecker(roleUser)
  }
  return false
}
