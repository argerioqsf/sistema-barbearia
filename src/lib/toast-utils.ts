import { toast } from '@/components/ui/use-toast'

export function showApiErrorToast(message: string) {
  toast({
    title: 'Erro na API',
    description: message,
    variant: 'destructive',
  })
}

export function showApiSuccessToast(message: string) {
  toast({
    title: '',
    description: message,
    variant: 'success',
  })
}
