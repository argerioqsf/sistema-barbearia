import { Role } from '@/types/general'

const features = {
  'dashboard.view': (roleUser: string) =>
    [
      'coordinator',
      'administrator',
      'indicator',
      'consultant',
      'financial',
    ].includes(roleUser),
  // USER
  'user.edit.role': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.view': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.detail': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.register': (roleUser: string) => ['administrator'].includes(roleUser),
  'user.list': (roleUser: string) => ['administrator'].includes(roleUser),
  // UNIT
  'unit.view': (roleUser: string) => ['administrator'].includes(roleUser),
  'unit.detail': (roleUser: string) => ['administrator'].includes(roleUser),
  'unit.register': (roleUser: string) => ['administrator'].includes(roleUser),
  'unit.list': (roleUser: string) => ['administrator'].includes(roleUser),
  // COURSE
  'course.view': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'course.detail': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'course.register': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'course.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  // SEGMENT
  'segment.view': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'segment.detail': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'segment.register': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'segment.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  // PROFILE
  'profile.view': (roleUser: string) =>
    [
      'coordinator',
      'administrator',
      'indicator',
      'consultant',
      'financial',
    ].includes(roleUser),
  // INDICATOR
  'indicator.view': (roleUser: string) => [''].includes(roleUser),
  'indicator.list': (roleUser: string) => [''].includes(roleUser),
  'indicator.register': (roleUser: string) =>
    ['administrator'].includes(roleUser),
  'indicator.detail': (roleUser: string) =>
    ['administrator'].includes(roleUser),
  // INDICATOR REQUEST
  'indicator_request.list': (roleUser: string) =>
    ['administrator'].includes(roleUser),
  // LEADS
  'lead.view': (roleUser: string) => ['administrator'].includes(roleUser),
  'lead.list': (roleUser: string) => ['administrator'].includes(roleUser),
  'lead.register': (roleUser: string) => ['administrator'].includes(roleUser),
  'lead.detail': (roleUser: string) => ['administrator'].includes(roleUser),
  // NEW LEADS
  'new_lead.list': (roleUser: string) => ['administrator'].includes(roleUser),
  // CONFIRMED LEADS
  'confirmed_lead.list': (roleUser: string) =>
    ['administrator'].includes(roleUser),
  // WAITING CONFIRMATION LEADS
  'waiting_confirmation_lead.list': (roleUser: string) =>
    ['administrator'].includes(roleUser),
}

export type UserAction = keyof typeof features

export function verifyPermissionUser(
  userAction: UserAction,
  roleUser: Role,
): boolean {
  return features[userAction](roleUser)
}
