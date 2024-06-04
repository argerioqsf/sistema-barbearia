'use client'

import LinkDefault from '@/components/atoms/LinkDefault'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Alert, InitialState, Toast } from '@/types/general'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import { useLocale } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type AvatarProps<T> = {
  classIcon?: string
  size?: number
  icon?: keyof CatalogIcons
  colorIcon?: string
  children?: React.ReactNode
  onClick?: (id?: string) => void | Promise<InitialState<T>>
  href?: string
  toastInfo?: Toast
  alertInfo?: Alert
  getClipBoard?: (id?: string) => Promise<string>
}

export default function IconAction<T>({
  href = '',
  classIcon = '',
  colorIcon = 'white',
  size = 36,
  icon,
  children,
  onClick,
  toastInfo,
  alertInfo,
  getClipBoard,
}: AvatarProps<T>) {
  const { toast } = useToast()
  const Icon = handleIcons(icon)
  const locale = useLocale()

  async function clipBoard() {
    if (getClipBoard) {
      const id = await getClipBoard()
      const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/sim/indicator/${id}`
      navigator.clipboard.writeText(link)
      toast({
        title: toastInfo?.title,
        description: toastInfo?.description,
      })
    }
  }

  return href.length > 0 ? (
    <LinkDefault className="flex justify-center items-center" href={href}>
      <span
        className={twMerge(
          'p-2 rounded-full flex justify-center items-center border-2',
          classIcon,
        )}
      >
        {children ?? <Icon size={size} color={colorIcon} />}
      </span>
    </LinkDefault>
  ) : alertInfo ? (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-fit" variant="ghost" size="icon">
          <span
            className={twMerge(
              'p-2 rounded-full flex justify-center items-center border-2',
              classIcon,
            )}
          >
            {children ?? <Icon size={size} color={colorIcon} />}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{alertInfo?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertInfo?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel asChild>
            <Button className="bg-slate-500">Não</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={async () => {
                const resp = onClick && (await onClick())
                if (resp?.ok) {
                  toast({
                    title: toastInfo?.title,
                    description: toastInfo?.description,
                  })
                } else if (resp?.errors) {
                  toast({
                    title: resp?.errors.request,
                  })
                } else {
                  toast({
                    title: 'Não foi possivel executar esta ação',
                    description: 'Tente novamente',
                  })
                }
              }}
              className="bg-rose-700"
            >
              Sim
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <button
      onClick={async () => {
        onClick ? onClick() : clipBoard()
      }}
      type="button"
      className="flex rounded-full justify-center items-center focus:bg-transparent bg-transparent p-0"
    >
      <span
        className={twMerge(
          'p-2 rounded-full flex justify-center items-center border-2',
          classIcon,
        )}
      >
        {children ?? <Icon size={size} color={colorIcon} />}
      </span>
    </button>
  )
}
