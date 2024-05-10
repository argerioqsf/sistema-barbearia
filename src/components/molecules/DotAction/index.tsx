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

type AvatarProps<T> = {
  href?: string
  onClick?: (id?: string) => void | Promise<InitialState<T>>
  toastInfo?: Toast
  alertInfo?: Alert
  name?: string
}

export default function DotAction<T>({
  href = '',
  onClick,
  toastInfo,
  alertInfo,
  name,
}: AvatarProps<T>) {
  const { toast } = useToast()
  return href?.length > 0 ? (
    <LinkDefault
      href={href}
      className="block px-4 py-2 hover:bg-white dark:hover:bg-white dark:hover:text-secondary-50"
    >
      {name}
    </LinkDefault>
  ) : (
    <AlertDialog>
      <AlertDialogTrigger className="w-full px-4 py-2 justify-start" asChild>
        <Button variant="ghost" size="icon">
          {name}
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
  )
}
