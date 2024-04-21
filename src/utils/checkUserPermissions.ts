import { Role } from '@/types/general'

const verifyPermissionGeneral = {
  all: (roleUser: string) =>
    [
      'coordinator',
      'administrator',
      'indicator',
      'consultant',
      'financial',
    ].includes(roleUser),
}

const verifyPermissionUser = {
  'user.edit.role': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.view': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.detail': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.register': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.list': (roleUser: string) => ['administrator'].includes(roleUser),
}

const verifyPermissionUnit = {
  'unit.view': (roleUser: string) => ['administrator'].includes(roleUser),
  'unit.detail': (roleUser: string) => ['administrator'].includes(roleUser),
  'unit.register': (roleUser: string) => ['administrator'].includes(roleUser),
  'unit.list': (roleUser: string) => ['administrator'].includes(roleUser),
}

const verifyPermissionCourse = {
  'course.view': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'course.detail': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'course.register': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'course.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
}

const verifyPermissionSegment = {
  'segment.view': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'segment.detail': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'segment.register': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'segment.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
}

const verifyPermissionProfile = {
  'profile.view': (roleUser: string) =>
    [
      'coordinator',
      'administrator',
      'indicator',
      'consultant',
      'financial',
    ].includes(roleUser),
}

const verifyPermissionIndicator = {
  'indicator.view': (roleUser: string) => [''].includes(roleUser),
  'indicator.list': (roleUser: string) => [''].includes(roleUser),
  'indicator.register': (roleUser: string) =>
    ['administrator'].includes(roleUser),
  'indicator.detail': (roleUser: string) =>
    ['administrator'].includes(roleUser),
}

const verifyPermissionIndicatorRequest = {
  'indicator_request.list': (roleUser: string) =>
    ['administrator'].includes(roleUser),
}

const verifyPermissionLead = {
  'lead.view': (roleUser: string) => ['administrator'].includes(roleUser),
  'lead.list': (roleUser: string) => ['administrator'].includes(roleUser),
  'lead.register': (roleUser: string) => ['administrator'].includes(roleUser),
  'lead.detail': (roleUser: string) => ['administrator'].includes(roleUser),
}

const verifyPermissionNewLead = {
  'new_lead.list': (roleUser: string) => ['administrator'].includes(roleUser),
}

const verifyPermissionConfirmedLead = {
  'confirmed_lead.list': (roleUser: string) =>
    ['administrator'].includes(roleUser),
}

const verifyPermissionWaitingConfirmedLead = {
  'waiting_confirmation_lead.list': (roleUser: string) =>
    ['administrator'].includes(roleUser),
}

const verifyPermissionDashboard = {
  'dashboard.view': (roleUser: string) =>
    [
      'coordinator',
      'administrator',
      'indicator',
      'consultant',
      'financial',
    ].includes(roleUser),
}

const verifyPermission = {
  ...verifyPermissionGeneral,
  ...verifyPermissionUser,
  ...verifyPermissionUnit,
  ...verifyPermissionCourse,
  ...verifyPermissionSegment,
  ...verifyPermissionProfile,
  ...verifyPermissionIndicator,
  ...verifyPermissionIndicatorRequest,
  ...verifyPermissionLead,
  ...verifyPermissionNewLead,
  ...verifyPermissionConfirmedLead,
  ...verifyPermissionWaitingConfirmedLead,
  ...verifyPermissionDashboard,
}

export type UserAction = keyof typeof verifyPermission

export function checkUserPermissions(
  userAction: UserAction,
  roleUser: Role,
): boolean {
  return verifyPermission[userAction](roleUser)
}
