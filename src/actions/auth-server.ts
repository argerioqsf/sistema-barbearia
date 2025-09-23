'use server'
import { clearAuthCookiesServer } from '@/utils/cookieServer'
import { redirect } from 'next/navigation'

export async function clearAuthCookiesAndRedirect() {
  try {
    clearAuthCookiesServer()
  } catch (e) {
    console.error('Error clearing auth cookies in Server Action:', e)
  }
  redirect('/auth/signin')
}
