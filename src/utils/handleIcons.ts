import {
  ChevronDown,
  ChevronRight,
  Circle,
  Clipboard,
  Clock,
  Edit,
  Eye,
  Handshake,
  LayoutDashboard,
  Link,
  Lock,
  LucideIcon,
  Menu,
  Search,
  User,
  Users,
} from 'lucide-react'

const catalogIcons = {
  ChevronDown,
  ChevronRight,
  Circle,
  Clipboard,
  LayoutDashboard,
  Edit,
  Eye,
  Handshake,
  Lock,
  Menu,
  Search,
  User,
  Users,
  Link,
  Clock,
} as const

export type CatalogIcons = typeof catalogIcons

export const handleIcons = (icon?: keyof CatalogIcons): LucideIcon => {
  return icon ? catalogIcons[icon] : catalogIcons.User
}
