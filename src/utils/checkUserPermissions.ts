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
  'user.edit.own.active': (roleUser: string) =>
    ['administrator'].includes(roleUser),
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
  'indicator.view': (roleUser: string) =>
    ['administrator', 'coordinator', 'indicator'].includes(roleUser),
  'indicator.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'indicator.register': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'indicator.detail': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'indicator.monitoring.view': (roleUser: string) =>
    ['indicator'].includes(roleUser),
  'indicator.files.view': (roleUser: string) =>
    ['indicator'].includes(roleUser),
  'indicator.leads.list': (roleUser: string) =>
    ['indicator'].includes(roleUser),
  'indicator.pendingPayment.list': (roleUser: string) =>
    ['administrator', 'financial'].includes(roleUser),
}

const verifyPermissionConsultant = {
  'consultant.view': (roleUser: string) =>
    ['consultant', 'administrator', 'financial'].includes(roleUser),
  'consultant.monitoring.view': (roleUser: string) =>
    ['consultant'].includes(roleUser),
  'consultant.leads.list': (roleUser: string) =>
    ['consultant'].includes(roleUser),
  'consultant.pendingPayment.list': (roleUser: string) =>
    ['administrator', 'financial'].includes(roleUser),
}

const verifyPermissionIndicatorRequest = {
  'indicator_request.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
}

const verifyPermissionLead = {
  'lead.view': (roleUser: string) =>
    ['administrator', 'coordinator', 'consultant', 'secretary'].includes(
      roleUser,
    ),
  'lead.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'lead.register': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'lead.update': (roleUser: string) =>
    ['administrator', 'coordinator', 'indicator'].includes(roleUser),
  'lead.detail': (roleUser: string) =>
    ['administrator', 'coordinator', 'indicator', 'consultant'].includes(
      roleUser,
    ),
  'lead.archived.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'lead.archived.set': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
  'lead.pegar.set': (roleUser: string) => ['consultant'].includes(roleUser),
  'lead.matriculation.set': (roleUser: string) =>
    ['consultant', 'administrator'].includes(roleUser),
  'lead.documents.set': (roleUser: string) =>
    ['administrator', 'secretary'].includes(roleUser),
}

const verifyPermissionNewLead = {
  'new_lead.list': (roleUser: string) =>
    ['administrator', 'coordinator', 'consultant'].includes(roleUser),
}

const verifyPermissionConfirmedLead = {
  'confirmed_lead.list': (roleUser: string) =>
    ['administrator', 'coordinator', 'secretary'].includes(roleUser),
}

const verifyPermissionWaitingConfirmedLead = {
  'waiting_confirmation_lead.list': (roleUser: string) =>
    ['administrator', 'coordinator'].includes(roleUser),
}

const verifyPermissionDashboard = {
  'dashboard.view': (roleUser: string) =>
    ['coordinator', 'administrator', 'financial', 'secretary'].includes(
      roleUser,
    ),
}

const verifyPermissionOrganization = {
  'organization.detail': (roleUser: string) =>
    ['administrator'].includes(roleUser),
  'organization.update': (roleUser: string) =>
    ['administrator'].includes(roleUser),
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
  ...verifyPermissionConsultant,
  ...verifyPermissionOrganization,
}

export type UserAction = keyof typeof verifyPermission

export function checkUserPermissions(
  userAction: UserAction,
  roleUser: Role,
): boolean {
  return verifyPermission[userAction](roleUser)
}
