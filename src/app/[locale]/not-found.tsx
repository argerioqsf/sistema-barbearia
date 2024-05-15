import { getProfile } from '@/actions/profile'
import NotFoundPage from '@/components/template/NotFoundPage/page'

export default async function NotFound() {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  return (
    <body>
      <NotFoundPage
        href={
          profile?.role === 'indicator'
            ? 'dashboard/indicators/monitoring'
            : 'dashboard/home'
        }
      />
    </body>
  )
}
